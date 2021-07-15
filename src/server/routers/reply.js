const mongoose = require('mongoose');
const Reply = require('../models/reply');
const Question = require('../models/question');

module.exports = {
	getAll: (req, res) => {
		Reply.find((err, reply) => {
			if (err) return res.status(400).json(err);
			if (!reply) return res.status(404).json();

			if (reply.length === 0)
				return res.status(404).json('No matching documents');
			res.json(reply);
		});
	},

	createOne: (req, res) => {
		let newReplyDetails = req.body;
		newReplyDetails._id = new mongoose.Types.ObjectId();

		let reply = new Reply(newReplyDetails);
		reply.save((err) => {
			if (!err) {
				// Add reply to parent reply / question
				if (newReplyDetails.parentReply) {
					Reply.findOne(
						{ _id: newReplyDetails.parentReply },
						(err, reply) => {
							if (err) return res.status(400).json(err);
							if (!reply) return res.status(404).json();

							reply.replies.push(newReplyDetails._id);
							reply.save((err) => {
								res.json(reply);
							});
						}
					);
				} else if (newReplyDetails.parentQuestion) {
					Question.findOne(
						{ _id: newReplyDetails.parentQuestion },
						(err, question) => {
							if (err) return res.status(400).json(err);
							if (!question) return res.status(404).json();

							question.replies.push(newReplyDetails._id);
							question.save((err) => {
								res.json(question);
							});
						}
					);
				}
			}
		});
	},

	getOne: (req, res) => {
		// Reply.findOne({ _id: req.params.id }, (err, reply) => {
		// 	if (err) return res.status(400).json(err);
		// 	if (!reply) return res.status(404).json();

		// 	// Fetch replies
		// 	Reply.find({ parentReply: reply._id })
		// 		.sort({ votes: -1 })
		// 		.exec((err, replies) => {
		// 			if (err) return res.status(400).json(err);
		// 			reply.replies = replies;
		// 			reply.repliesCount = replies.length;
		// 			res.json(reply);
		// 		});
		// });
		Reply.findOne({ _id: req.params.id })
			.populate('author')
			.populate('replies')
			.exec((err, reply) => {
				if (err) return res.status(400).json(err);
				res.json(reply);
			});
	},

	updateOne: (req, res) => {
		Reply.findOneAndUpdate(
			{ _id: req.params.id },
			req.body,
			{ returnOriginal: false },
			(err, reply) => {
				if (err) return res.status(400).json(err);
				if (!reply) return res.status(404).json();
				res.json(reply);
			}
		);
	},

	deleteOne: (req, res) => {
		// Delete replies of the reply
		Reply.deleteMany({ parentReply: req.params.id }, (err) => {
			if (err) return res.status(400).json(err);

			// Delete the reply itself
			Reply.findOneAndRemove({ _id: req.params.id }, (err) => {
				if (err) return res.status(400).json(err);
				res.json();
			});
		});
	},

	upvote: (req, res) => {
		Reply.findOneAndUpdate(
			{ _id: req.params.id },
			{ $inc: { votes: 1 } },
			{ returnOriginal: false },
			(err, reply) => {
				if (err) return res.status(400).json(err);
				if (!reply) return res.status(404).json();
				res.json(reply);
			}
		);
	},

	downvote: (req, res) => {
		Reply.findOneAndUpdate(
			{ _id: req.params.id },
			{ $inc: { votes: -1 } },
			{ returnOriginal: false },
			(err, reply) => {
				if (err) return res.status(400).json(err);
				if (!reply) return res.status(404).json();
				res.json(reply);
			}
		);
	},
};
