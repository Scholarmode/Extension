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
        question.save((err) => {
            if (err) return res.status(400).json(err)
            res.json(question)
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

            console.log(upvoters)
            console.log(downvoters)

            if (downvoters.includes(accountId)) {
                console.log(`Before removal: ${downvoters}`)
                downvoters.splice(downvoters.indexOf(accountId), 1)
                console.log(`After removal: ${downvoters}`)

                upvoters.push(accountId)
            } else if (upvoters.includes(accountId)) {
                return res
                    .status(422)
                    .json('The user has already upvoted this question.')
            } else {
                upvoters.push(accountId)
            }

            question.votes += 1
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

            console.log(upvoters)
            console.log(downvoters)

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

            question.votes -= 1
            question.upvoters = upvoters
            question.downvoters = downvoters
            question.save()
            res.json()
        })
    },
}
