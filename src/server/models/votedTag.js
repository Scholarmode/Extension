const mongoose = require('mongoose');

const votedTagSchema = new mongoose.Schema({
	video: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    votes: Number,
    upvoters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
        },
    ],
    dateCreated: Date,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
    },
});

module.exports = mongoose.model('Tag', votedTagSchema);