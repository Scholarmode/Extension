const mongoose = require('mongoose')
const Tag = require('../models/votedTag')

module.exports = {
    createOne: (req, res) => {
        let newTagDetails = req.body
        newTagDetails._id = new mongoose.Types.ObjectId()

        let tag = new Tag(newTagDetails)
        tag.save((err) => {
            if (err) return err
            res.json(tag)
        })
    },

    getOne: (req, res) => {
        Tag.findOne({ _id: req.params.id }, (err, tag) => {
            if (err) return res.status(400).json(err)
            if (!tag) return res.status(404).json()
            res.json(tag)
        })
    },

    deleteOne: (req, res) => {
        Tag.findOneAndRemove({ _id: req.params.id }, (err) => {
            if (err) return res.status(400).json(err)
            res.json()
        })
    },

    upvote: (req, res) => {
        Tag.findOne({ _id: req.params.id }, (err, tag) => {
            if (err) return res.status(400).json(err)
            if (!tag) return res.status(404).json()

            const accountId = req.params.accountId
            let upvoters = tag.upvoters

            if (upvoters.includes(accountId)) {
                upvoters.splice(upvoters.indexOf(accountId), 1)
                return res
                    .status(422)
                    .json('The user has already upvoted this reply.')

            } else if (!upvoters.includes(accountId)) {
                
            } else {
                upvoters.push(accountId)
            }

            tag.votes = upvoters.length
            tag.upvoters = upvoters
            tag.save()
            res.json()
        })
    },

    getVideoTags: (req, res) => {
        Tag.find({ video: req.params.id })
            .sort({ votes: -1 })
            .exec((err, tags) => {
                if (err) return res.status(400).json(err)
                if (!tags) return res.status(404).json()

                return res.json(tags)
            })
    },

}