require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const accounts = require('./routers/account');
const questions = require('./routers/question');
const replies = require('./routers/reply');
const app = express();

app.listen(8080);
console.log('Listening on port 8080');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
app.post('/accounts', accounts.createOne);
app.get('/accounts/:id', accounts.getOne);
app.delete('/accounts/:id', accounts.deleteOne);

// Question RESTFul endpoints
app.get('/questions', questions.getAll);
app.post('/questions', questions.createOne);
app.get('/questions/:id', questions.getOne);
app.delete('/questions/:id', questions.deleteOne);
app.put('/questions/:id/upvote', questions.upvote);
app.put('/questions/:id/downvote', questions.downvote);

// Reply RESTFul endpoints
app.get('/replies', replies.getAll);
app.post('/replies', replies.createOne);
app.get('/replies/:id', replies.getOne);
app.delete('/replies/:id', replies.deleteOne);
app.put('/replies/:id/upvote', replies.upvote);
app.put('/replies/:id/downvote', replies.downvote);
