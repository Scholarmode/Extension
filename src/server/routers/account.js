const mongoose = require('mongoose');
const Account = require('../models/account');
const Question = require('../models/question');

module.exports = {
	getAll: (req, res) => {
		Account.find((err, accounts) => {
			if (err) return res.status(400).json(err);
			if (!accounts) return res.status(404).json();

			if (accounts.length === 0)
				return res.status(404).json('No matching documents');
			res.json(accounts);
		});
	},

	createOne: (req, res) => {
		let newAccountDetails = req.body;
		newAccountDetails._id = new mongoose.Types.ObjectId();

		let account = new Account(newAccountDetails);
		account.save((err) => {
			res.json(account);
		});
	},

	getOne: (req, res) => {
		Account.findOne({ _id: req.params.id }, (err, account) => {
			if (err) return res.status(400).json(err);
			if (!account) return res.status(404).json();
			res.json(account);
		});
	},

	updateOne: (req, res) => {
		Account.findOneAndUpdate(
			{ _id: req.params.id },
			req.body,
			{ returnOriginal: false },
			(err, actor) => {
				if (err) return res.status(400).json(err);
				if (!actor) return res.status(404).json();
				res.json(actor);
			}
		);
	},

	deleteOne: (req, res) => {
		Account.findOneAndRemove({ _id: req.params.id }, (err) => {
			if (err) return res.status(400).json(err);
			res.json();
		});
	},
};
