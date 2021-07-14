const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	googleId: String,
	email: String,
	verified_email: Boolean,
	name: String,
	given_name: String,
	family_name: String,
	picture: String,
	locale: String,
});

module.exports = mongoose.model('Account', accountSchema);
