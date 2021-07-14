require('dotenv').config();
const passport = require('passport');
const cookieSession = require('cookie-session');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const Account = require('./models/account');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const accounts = require('./routers/account');
const questions = require('./routers/question');
const replies = require('./routers/reply');
const app = express();

// Authenticate with Google Token Strategy
passport.use(
	new GoogleTokenStrategy(
		{
			clientID: process.env.G_CLIENT_ID,
			clientSecret: process.env.G_CLIENT_SECRET,
		},
		(accessToken, refreshToken, profile, done) => {
			console.log(accessToken);
			Account.findOne({ googleId: profile.id }).then((currentUser) => {
				if (currentUser) {
					console.log(profile._json);
					done(null, currentUser);
				} else {
					// Save to the account collection
					let newAccountDetails = profile._json;
					newAccountDetails._id = new mongoose.Types.ObjectId();
					newAccountDetails.googleId = profile.id;

					let account = new Account(newAccountDetails);
					account.save((newUser) => {
						done(null, newUser);
					});
				}
			});
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	Account.findById(id).then((user) => {
		done(null, user);
	});
});

app.listen(8080);
console.log('Listening on port 8080');

app.use(
	cookieSession({
		maxAge: 24 * 60 * 60 * 1000, // 1 day
		keys: [process.env.S_COOKIE_KEY],
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

const atlasUser = process.env.ATLAS_USER;
const atlasPwrd = process.env.ATLAS_PWRD;

const uri = `mongodb+srv://${atlasUser}:${atlasPwrd}@realmcluster.fi10q.mongodb.net/ScholarMode?retryWrites=true&w=majority`;

mongoose.connect(
	uri,
	{
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: false,
	},
	function (err) {
		if (err) {
			return console.log('Mongoose - connection error:', err);
		}
		console.log('Connected to Mongoose successfully');
	}
);

//Configuring Endpoints
// Account RESTFul endpoints
app.get('/accounts', accounts.getAll);
app.get('/accounts/:id', accounts.getOne);
app.post('/accounts', accounts.createOne);
app.put('/accounts/:id', accounts.updateOne);
app.delete('/accounts/:id', accounts.deleteOne);

// Question RESTFul endpoints
app.get('/questions', questions.getAll);
app.get('/questions/:id', questions.getOne);
// app.get('/questions/author/:id', questions.getAuthorQuestions);
app.post('/questions', questions.createOne);
app.put('/questions/:id', questions.updateOne);
app.delete('/questions/:id', questions.deleteOne);
app.put('/questions/:id/upvote', questions.upvote);
app.put('/questions/:id/downvote', questions.downvote);

// Reply RESTFul endpoints
app.get('/replies', replies.getAll);
app.get('/replies/:id', replies.getOne);
app.post('/replies', replies.createOne);
app.put('/replies/:id', replies.updateOne);
app.delete('/replies/:id', replies.deleteOne);
app.put('/replies/:id/upvote', replies.upvote);
app.put('/replies/:id/downvote', replies.downvote);

// Google AUTH endpoints
app.get('/auth/chrome', passport.authenticate('google-token'), (req, res) => {
	console.log(req.params);
	res.json(req.user);
});
