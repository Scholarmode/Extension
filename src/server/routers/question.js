const mongoose = require('mongoose');
const Question = require('../models/question');
const Replies = require('../models/reply');

module.exports = {
	getAll: (req, res) => {
		Question.find((err, questions) => {
			if (err) return res.status(400).json(err);
			if (!questions) return res.status(404).json();

			if (questions.length === 0)
				return res.status(404).json('No matching documents');
			res.json(questions);
		});
	},

	createOne: (req, res) => {
		let newQuestionDetails = req.body;
		newQuestionDetails._id = new mongoose.Types.ObjectId();

		let question = new Question(newQuestionDetails);
		question.save((err) => {
			res.json(question);
		});
	},

	getOne: (req, res) => {
		Question.findOne({ _id: req.params.id }, (err, question) => {
			if (err) return res.status(400).json(err);
			if (!question) return res.status(404).json();

			// Fetch replies
			const dbFilter = req.query.direct
				? { parentQuestion: question._id, parentReply: null }
				: { parentQuestion: question._id };

			Replies.find(dbFilter)
				.sort({ votes: -1 })
				.exec((err, replies) => {
					if (err) return res.status(400).json(err);
					question.replies = replies;
					question.repliesCount = replies.length;
					res.json(question);
				});
		});
	},

	getAuthorQuestions: (req, res) => {
		Question.find({ author: req.params.id }, (err, questions) => {
			if (err) return res.status(400).json(err);
			if (!questions) return res.status(404).json();
			return res.json(questions);
		});
	},
	
	updateOne: (req, res) => {
		Question.findOneAndUpdate(
			{ _id: req.params.id },
			req.body,
			{ returnOriginal: false },
			(err, question) => {
				if (err) return res.status(400).json(err);
				if (!question) return res.status(404).json();
				res.json(question);
			}
		);
	},

	deleteOne: (req, res) => {
		// Delete replies of the question
		Replies.deleteMany({ parentQuestion: req.params.id }, (err) => {
			if (err) return res.status(400).json(err);

			// Delete the question itself
			Question.findOneAndRemove({ _id: req.params.id }, (err) => {
				if (err) return res.status(400).json(err);
				res.json();
			});
		});
	},

	upvote: (req, res) => {
		Question.findOneAndUpdate(
			{ _id: req.params.id },
			{ $inc: { votes: 1 } },
			{ returnOriginal: false },
			(err, question) => {
				if (err) return res.status(400).json(err);
				if (!question) return res.status(404).json();
				res.json(question);
			}
		);
	},

	downvote: (req, res) => {
		Question.findOneAndUpdate(
			{ _id: req.params.id },
			{ $inc: { votes: -1 } },
			{ returnOriginal: false },
			(err, question) => {
				if (err) return res.status(400).json(err);
				if (!question) return res.status(404).json();
				res.json(question);
			}
		);
	},
};
