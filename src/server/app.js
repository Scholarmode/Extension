const express = require('express');
const mongoose = require('mongoose');

const accounts = require('./routers/account');
const questions = require('./routers/question');
const app = express();

app.listen(8080);
console.log('Listening on port 8080');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const uri =
	'mongodb+srv://ScholarAdmin:GPfWNlJSE4sT5PKZ@realmcluster.fi10q.mongodb.net/ScholarMode?retryWrites=true&w=majority';

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
