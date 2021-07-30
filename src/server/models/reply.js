const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
    },
    content: String,
    dateCreated: Date,
    flagged: Boolean,
    parentQuestion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
    },
    parentReply: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply',
    },
    reports: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
        },
    ],
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reply',
        },
    ],
    repliesCount: Number,
    slateLang: String,
    timestamp: String,
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

module.exports = mongoose.model('Reply', replySchema)
