const express = require('express')
const passport = require('passport')
const fetch = require('node-fetch')
const Account = require('../models/account')
const accounts = require('../routers/account')
const questions = require('../routers/question')
const replies = require('../routers/reply')

module.exports = async (expressApp) => {
    expressApp.use(express.json())
    expressApp.use(express.urlencoded({ extended: false }))

    expressApp.use('/accounts/:id', (req, res, next) => {
        const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${req.query.token}`
        // Try retrieve profile info using token via Google API
        fetch(url)
            .then((response) => response.json())
            .then((response) => {
                if (response.hasOwnProperty('error')) {
                    res.json({ message: 'Invalid or expired token.' })
                } else {
                    // If token is valid, ensure the user is accessing their own data.
                    Account.findOne({
                        googleId: response.id,
                    }).then((user) => {
                        if (user._id.toString() !== req.params.id) {
                            res.json({ message: 'Unauthorised user.' })
                        } else {
                            next()
                        }
                    })
                }
            })
    })

    //Configuring Endpoints
    // Account RESTFul endpoints
    expressApp.get('/accounts', accounts.getAll)
    expressApp.get('/accounts/:id', accounts.getOne)
    expressApp.post('/accounts', accounts.createOne)
    expressApp.put('/accounts/:id', accounts.updateOne)
    expressApp.delete('/accounts/:id', accounts.deleteOne)

    // Question RESTFul endpoints
    expressApp.get('/questions', questions.getAll)
    expressApp.get('/questions/:id', questions.getOne)
    expressApp.get('/questions/author/:id', questions.getAuthorQuestions)
    expressApp.post('/questions', questions.createOne)
    expressApp.put('/questions/:id', questions.updateOne)
    expressApp.delete('/questions/:id', questions.deleteOne)
    expressApp.put('/questions/:id/upvote', questions.upvote)
    expressApp.put('/questions/:id/downvote', questions.downvote)

    // Reply RESTFul endpoints
    expressApp.get('/replies', replies.getAll)
    expressApp.get('/replies/:id', replies.getOne)
    expressApp.post('/replies', replies.createOne)
    expressApp.put('/replies/:id', replies.updateOne)
    expressApp.delete('/replies/:id', replies.deleteOne)
    expressApp.put('/replies/:id/upvote', replies.upvote)
    expressApp.put('/replies/:id/downvote', replies.downvote)

    expressApp.get(
        '/auth/chrome',
        passport.authenticate('google-token'),
        (req, res) => {
            console.log(res)
            res.json(req.user)
        }
    )
}
