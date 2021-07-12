const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Account',
	},
	dateCreated: {
		type: Date,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	flagged: Boolean,
	votes: Number,
	replies: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Question',
		},
	],
	reports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }],
	timestamp: Date,
	video: String,
});

module.exports = mongoose.model('Question', questionSchema);
