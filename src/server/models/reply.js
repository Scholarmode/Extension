const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	author: String,
	content: {
		type: String,
		required: true,
	},
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
	reports: [String],
	timestamp: Date,
	votes: Number,
});

module.exports = mongoose.model('Reply', replySchema);
