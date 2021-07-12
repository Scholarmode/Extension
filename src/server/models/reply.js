const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	content: {
		type: String,
		required: true,
	},
	votes: Number,
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Account',
	},
	parentQuestion: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Question',
	},
	parentReply: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Reply',
	},
	reports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }],
	flagged: Boolean,
	timestamp: Date,
});

module.exports = mongoose.model('Reply', replySchema);
