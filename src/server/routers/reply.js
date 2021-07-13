const mongoose = require('mongoose');
const Reply = require('../models/reply');

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
			res.json(reply);
		});
	},

	getOne: (req, res) => {
		Reply.findOne({ _id: req.params.id }, (err, reply) => {
			if (err) return res.status(400).json(err);
			if (!reply) return res.status(404).json();

			// Fetch replies
			Reply.find({ parentReply: reply._id })
				.sort({ votes: -1 })
				.exec((err, replies) => {
					if (err) return res.status(400).json(err);
					reply.replies = replies;
					reply.repliesCount = replies.length;
					res.json(reply);
				});
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
		Reply.findOneAndRemove({ _id: req.params.id }, (err) => {
			if (err) return res.status(400).json(err);
			res.json();
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
