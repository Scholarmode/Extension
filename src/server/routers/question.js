const mongoose = require('mongoose')
const Question = require('../models/question')
const Reply = require('../models/reply')

module.exports = {
    getAll: (req, res) => {
        Question.find()
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
            .exec((err, questions) => {
                if (err) return res.status(400).json(err)
                if (!questions) return res.status(404).json()

                if (questions.length === 0)
                    return res.status(404).json('No matching documents')
                res.json(questions)
            })
    },

    createOne: (req, res) => {
        let newQuestionDetails = req.body
        newQuestionDetails._id = new mongoose.Types.ObjectId()

        let question = new Question(newQuestionDetails)
        question.populate('author').execPopulate((err, populatedQuestion) => {
            if (err) return res.status(400).json(err)

            populatedQuestion.save((err) => {
                if (err) return res.status(400).json(err)
                res.json(populatedQuestion)
            })
        })
    },

    getOne: (req, res) => {
        Question.findOne({ _id: req.params.id })
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
                if (err) return res.status(400).json(err)
                res.json(question)
            })
    },

    getAuthorQuestions: (req, res) => {
        Question.find({ author: req.params.id })
            .populate('author')
            .populate({
                path: 'replies',
                populate: [{ path: 'replies' }],
            })
            .exec((err, questions) => {
                if (err) return res.status(400).json(err)
                if (!questions) return res.status(404).json()
                return res.json(questions)
            })
    },

    getVideoQuestions: (req, res) => {
        Question.find({ video: req.params.id })
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
            .sort({ votes: -1 })
            .exec((err, questions) => {
                if (err) return res.status(400).json(err)
                if (!questions) return res.status(404).json()

                // Sort replies based on number of votes
                const recursiveSort = (q) => {
                    console.log(q)
                    if (!q.replies) return

                    recursiveSort(
                        q.replies.sort((a, b) => {
                            const votes1 = a.votes
                            const votes2 = b.votes

                            if (votes1 < votes2) return 1
                            if (votes1 > votes2) return -1
                            return 0
                        })
                    )

                    return q
                }

                return res.json(questions.map(recursiveSort))
            })
    },

    updateOne: (req, res) => {
        Question.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { returnOriginal: false },
            (err, question) => {
                if (err) return res.status(400).json(err)
                if (!question) return res.status(404).json()
                res.json(question)
            }
        )
    },

    deleteOne: (req, res) => {
        // Delete replies of the question
        Reply.deleteMany({ parentQuestion: req.params.id }, (err) => {
            if (err) return res.status(400).json(err)

            // Delete the question itself
            Question.findOneAndRemove({ _id: req.params.id }, (err) => {
                if (err) return res.status(400).json(err)
                res.json()
            })
        })
    },

    upvote: (req, res) => {
        Question.findOne({ _id: req.params.id }, (err, question) => {
            if (err) return res.status(400).json(err)
            if (!question) return res.status(404).json()

            const accountId = req.params.accountId
            let upvoters = question.upvoters
            let downvoters = question.downvoters

            if (downvoters.includes(accountId)) {
                downvoters.splice(downvoters.indexOf(accountId), 1)

                upvoters.push(accountId)
            } else if (upvoters.includes(accountId)) {
                return res
                    .status(422)
                    .json('The user has already upvoted this question.')
            } else {
                upvoters.push(accountId)
            }

            question.votes = upvoters.length - downvoters.length
            question.upvoters = upvoters
            question.downvoters = downvoters
            question.save()
            res.json()
        })
    },

    downvote: (req, res) => {
        Question.findOne({ _id: req.params.id }, (err, question) => {
            if (err) return res.status(400).json(err)
            if (!question) return res.status(404).json()

            const accountId = req.params.accountId
            let upvoters = question.upvoters
            let downvoters = question.downvoters

            if (upvoters.includes(accountId)) {
                upvoters.splice(upvoters.indexOf(accountId), 1)

                downvoters.push(accountId)
            } else if (downvoters.includes(accountId)) {
                return res
                    .status(422)
                    .json('The user has already downvoted this question.')
            } else {
                downvoters.push(accountId)
            }

            question.votes = upvoters.length - downvoters.length
            question.upvoters = upvoters
            question.downvoters = downvoters
            question.save()
            res.json()
        })
    },

    removeVote: (req, res) => {
        const accountId = req.params.accountId

        if (!req.params.id || !accountId)
            return res.status(400).json('Please include the account ID')

        Question.findOne({ _id: req.params.id })
            .populate('author')
            .populate('replies')
            .exec((err, question) => {
                if (err) return res.status(400).json(err)
                if (!question) return res.status(404).json(err)

                // Remove account in upvoters and downvoters array
                let upvoters = question.upvoters
                let downvoters = question.downvoters

                if (upvoters.includes(accountId)) {
                    upvoters.splice(upvoters.indexOf(accountId), 1)
                }

                if (downvoters.includes(accountId)) {
                    downvoters.splice(downvoters.indexOf(accountId), 1)
                }

                question.upvoters = upvoters
                question.downvoters = downvoters
                question.votes = upvoters.length - downvoters.length
                question.save((err, question) => {
                    if (err) return res.status(400).json(err)
                    if (!question) return res.status(404).json(err)
                    res.json(question)
                })
            })
    },

    report: (req, res) => {
        Question.findOne({ _id: req.params.id }, (err, question) => {
            if (err) return res.status(400).json(err)
            if (!question) return res.status(404).json()

            const accountId = req.params.accountId
            let reports = question.reports

            if (reports.includes(accountId)) {
                return res
                    .status(422)
                    .json('The user has already reported this question.')
            } else {
                reports.push(accountId)
            }

            question.reports = reports
            question.save()
            res.json()
        })
    },

    removeReport: (req, res) => {
        Question.findOne({ _id: req.params.id }, (err, question) => {
            if (err) return res.status(400).json(err)
            if (!question) return res.status(404).json()

            const accountId = req.params.accountId
            let reports = question.reports

            if (reports.includes(accountId)) {
                reports.splice(reports.indexOf(accountId), 1)
            }

            question.reports = reports
            question.save()
            res.json()
        })
    },
}
