const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	author: String,
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
	timestamp: Date,
	title: {
		type: String,
		required: true,
	},
	video: String,
	votes: Number,
});

module.exports = mongoose.model('Question', questionSchema);
