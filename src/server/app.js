require('dotenv').config()
const loaders = require('./loaders')
const cookieSession = require('cookie-session')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const accounts = require('./routers/account')
const questions = require('./routers/question')
const replies = require('./routers/reply')
const app = express()
const port = process.env.PORT || 8080

app.listen(port)
console.log(`Listening on port ${port}`)

app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        keys: [process.env.S_COOKIE_KEY],
    })
)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())

const atlasUser = process.env.ATLAS_USER
const atlasPwrd = process.env.ATLAS_PWRD

const uri = `mongodb+srv://${atlasUser}:${atlasPwrd}@realmcluster.fi10q.mongodb.net/ScholarMode?retryWrites=true&w=majority`

mongoose.connect(
    uri,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
    },
    function (err) {
        if (err) {
            return console.log('Mongoose - connection error:', err)
        }
        console.log('Connected to Mongoose successfully')
    }
)

loaders(app)

//Configuring Endpoints
// Account RESTFul endpoints
app.get('/accounts', accounts.getAll)
app.get('/accounts/:id', accounts.getOne)
app.post('/accounts', accounts.createOne)
app.put('/accounts/:id', accounts.updateOne)
app.delete('/accounts/:id', accounts.deleteOne)

// Question RESTFul endpoints
app.get('/questions', questions.getAll)
app.get('/questions/:id', questions.getOne)
app.get('/questions/author/:id', questions.getAuthorQuestions)
app.post('/questions', questions.createOne)
app.put('/questions/:id', questions.updateOne)
app.delete('/questions/:id', questions.deleteOne)
app.put('/questions/:id/:accountId/upvote', questions.upvote)
app.put('/questions/:id/:accountId/downvote', questions.downvote)
app.put('/questions/:id/:accountId/report', questions.report)
app.delete('/questions/:id/:accountId/report', questions.removeReport)

// Reply RESTFul endpoints
app.get('/replies', replies.getAll)
app.get('/replies/:id', replies.getOne)
app.post('/replies', replies.createOne)
app.put('/replies/:id', replies.updateOne)
app.delete('/replies/:id', replies.deleteOne)
app.put('/replies/:id/:accountId/upvote', replies.upvote)
app.put('/replies/:id/:accountId/downvote', replies.downvote)
app.put('/replies/:id/:accountId/report', replies.report)
app.delete('/replies/:id/:accountId/report', replies.removeReport)
