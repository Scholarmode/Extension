const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	googleId: String,
	email: {
		type: String,
		required: true,
	},
	email_verified: Boolean,
	picture: String,
	name: String,
	given_name: String,
	family_name: String,
	locale: String,
});

module.exports = mongoose.model('Account', accountSchema);
