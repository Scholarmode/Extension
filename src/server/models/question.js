const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
    },
    content: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        required: true,
    },
    flagged: Boolean,
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reply',
        },
    ],
    repliesCount: Number,
    reports: [String],
    timestamp: String,
    title: {
        type: String,
        required: true,
    },
    video: String,
    votes: Number,
    upvoters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
        },
    ],
    downvoters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
        },
    ],
})

module.exports = mongoose.model('Question', questionSchema)
