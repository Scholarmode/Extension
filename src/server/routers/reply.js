const mongoose = require('mongoose')
const Reply = require('../models/reply')
const Question = require('../models/question')

module.exports = {
    getAll: (req, res) => {
        Reply.find((err, reply) => {
            if (err) return res.status(400).json(err)
            if (!reply) return res.status(404).json()

            if (reply.length === 0)
                return res.status(404).json('No matching documents')
            res.json(reply)
        })
    },

    createOne: (req, res) => {
        const getQuestion = (qId) => {
            Question.findOne({ _id: qId })
                .populate('author')
                .populate({
                    path: 'replies',
                    populate: [
                        { path: 'author' },
                        {
                            path: 'replies',
                            populate: [{ path: 'author' }, { path: 'replies' }],
                        },
                    ],
                })
                .exec((err, question) => {
                    if (err) return err
                    res.json(question.replies)
                })
        }

        let newReplyDetails = req.body
        newReplyDetails._id = new mongoose.Types.ObjectId()

        let reply = new Reply(newReplyDetails)

        reply.populate('author').execPopulate((err, populatedReply) => {
            if (err) return res.status(400).json(err)

            populatedReply.save((err) => {
                if (err) return res.status(400).json(err)

                // Add reply to parent reply / question
                if (newReplyDetails.parentReply) {
                    Reply.findOne(
                        { _id: newReplyDetails.parentReply },
                        (err, reply) => {
                            if (err) return res.status(400).json(err)
                            if (!reply) return res.status(404).json()

                            reply.replies.push(newReplyDetails._id)
                            reply.save((err) => {
                                if (err) return res.status(400).json(err)
                                getQuestion(populatedReply.parentQuestion)
                            })
                        }
                    )
                } else if (newReplyDetails.parentQuestion) {
                    Question.findOne(
                        { _id: newReplyDetails.parentQuestion },
                        (err, question) => {
                            if (err) return res.status(400).json(err)
                            if (!question) return res.status(404).json()

                            question.replies.push(newReplyDetails._id)
                            question.save((err) => {
                                if (err) return res.status(400).json(err)
                                getQuestion(populatedReply.parentQuestion)
                            })
                        }
                    )
                }
            })
        })
    },

    getOne: (req, res) => {
        // Reply.findOne({ _id: req.params.id }, (err, reply) => {
        // 	if (err) return res.status(400).json(err);
        // 	if (!reply) return res.status(404).json();

        // 	// Fetch replies
        // 	Reply.find({ parentReply: reply._id })
        // 		.sort({ votes: -1 })
        // 		.exec((err, replies) => {
        // 			if (err) return res.status(400).json(err);
        // 			reply.replies = replies;
        // 			reply.repliesCount = replies.length;
        // 			res.json(reply);
        // 		});
        // });
        Reply.findOne({ _id: req.params.id })
            .populate('author')
            .populate('replies')
            .exec((err, reply) => {
                if (err) return res.status(400).json(err)
                res.json(reply)
            })
    },

    updateOne: (req, res) => {
        Reply.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { returnOriginal: false },
            (err, reply) => {
                if (err) return res.status(400).json(err)
                if (!reply) return res.status(404).json()
                res.json(reply)
            }
        )
    },

    deleteOne: (req, res) => {
        // Delete replies of the reply
        Reply.deleteMany({ parentReply: req.params.id }, (err) => {
            if (err) return res.status(400).json(err)

            // Delete the reply itself
            Reply.findOneAndRemove({ _id: req.params.id }, (err) => {
                if (err) return res.status(400).json(err)
                res.json()
            })
        })
    },

    upvote: (req, res) => {
        Reply.findOne({ _id: req.params.id }, (err, reply) => {
            if (err) return res.status(400).json(err)
            if (!reply) return res.status(404).json()

            const accountId = req.params.accountId
            let upvoters = reply.upvoters
            let downvoters = reply.downvoters

            if (downvoters.includes(accountId)) {
                downvoters.splice(downvoters.indexOf(accountId), 1)

                upvoters.push(accountId)
            } else if (upvoters.includes(accountId)) {
                return res
                    .status(422)
                    .json('The user has already upvoted this reply.')
            } else {
                upvoters.push(accountId)
            }

            reply.votes = upvoters.length - downvoters.length
            reply.upvoters = upvoters
            reply.downvoters = downvoters
            reply.save()
            res.json()
        })
    },

    downvote: (req, res) => {
        Reply.findOne({ _id: req.params.id }, (err, reply) => {
            if (err) return res.status(400).json(err)
            if (!reply) return res.status(404).json()

            const accountId = req.params.accountId
            let upvoters = reply.upvoters
            let downvoters = reply.downvoters

            if (upvoters.includes(accountId)) {
                upvoters.splice(upvoters.indexOf(accountId), 1)

                downvoters.push(accountId)
            } else if (downvoters.includes(accountId)) {
                return res
                    .status(422)
                    .json('The user has already downvoted this reply.')
            } else {
                downvoters.push(accountId)
            }

            reply.votes = upvoters.length - downvoters.length
            reply.upvoters = upvoters
            reply.downvoters = downvoters
            reply.save()
            res.json()
        })
    },

    removeVote: (req, res) => {
        const accountId = req.params.accountId

        if (!req.params.id || !accountId)
            return res.status(400).json('Please include the account ID')

        Reply.findOne({ _id: req.params.id })
            .populate('author')
            .populate('replies')
            .exec((err, reply) => {
                if (err) return res.status(400).json(err)
                if (!reply) return res.status(404).json(err)

                // Remove account in upvoters and downvoters array
                let upvoters = reply.upvoters
                let downvoters = reply.downvoters

                if (upvoters.includes(accountId)) {
                    upvoters.splice(upvoters.indexOf(accountId), 1)
                }

                if (downvoters.includes(accountId)) {
                    downvoters.splice(downvoters.indexOf(accountId), 1)
                }

                reply.upvoters = upvoters
                reply.downvoters = downvoters
				reply.votes = upvoters.length - downvoters.length
                reply.save((err, reply) => {
                    if (err) return res.status(400).json(err)
                    if (!reply) return res.status(404).json(err)
                    res.json(reply)
                })
            })
    },

    report: (req, res) => {
        Reply.findOne({ _id: req.params.id }, (err, reply) => {
            if (err) return res.status(400).json(err)
            if (!reply) return res.status(404).json()

            const accountId = req.params.accountId
            let reports = reply.reports

            if (reports.includes(accountId)) {
                return res
                    .status(422)
                    .json('The user has already reported this question.')
            } else {
                reports.push(accountId)
            }

            reply.reports = reports
            reply.save()
            res.json()
        })
    },

    removeReport: (req, res) => {
        Reply.findOne({ _id: req.params.id }, (err, reply) => {
            if (err) return res.status(400).json(err)
            if (!reply) return res.status(404).json()

            const accountId = req.params.accountId
            let reports = reply.reports

            if (reports.includes(accountId)) {
                reports.splice(reports.indexOf(accountId), 1)
            }

            reply.reports = reports
            reply.save()
            res.json()
        })
    },
}
