const mongoose = require('mongoose');
const Question = require('../models/question');

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
			res.json(question);
		});
	},

	updateOne: (req, res) => {
		Question.findOneAndUpdate(
			{ _id: req.params.id },
			req.body,
			(err, question) => {
				if (err) return res.status(400).json(err);
				if (!question) return res.status(404).json();
				res.json(question);
			}
		);
	},

	deleteOne: (req, res) => {
		Question.findOneAndRemove({ _id: req.params.id }, (err) => {
			if (err) return res.status(400).json(err);
			res.json();
		});
	},
};
