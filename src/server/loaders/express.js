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

    /** Secures account routes to require a Google OAuth token. */
    expressApp.use('/accounts', (req, res, next) => {
        const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${req.query.token}`
        // Try retrieve profile info using token via Google API
        fetch(url)
            .then((response) => response.json())
            .then((response) => {
                if (response.hasOwnProperty('error')) {
                    res.json({ message: 'Invalid or expired token.' })
                } else {
                    res.locals.googleId = response.id
                    next()
                }
            })
    })

    /** Secures user-specific account routes to ensure users can only access/modify their own data.*/
    expressApp.use('/accounts/:id', (req, res, next) => {
        Account.findOne({
            googleId: res.locals.googleId,
        }).then((user) => {
            if (user._id.toString() !== req.params.id) {
                res.json({ message: 'Unauthorised user.' })
            } else {
                next()
            }
        })
    })

    /** Secures question routes to require a Google OAuth token. */
    expressApp.use('/questions', (req, res, next) => {
        const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${req.query.token}`
        // Try retrieve profile info using token via Google API
        fetch(url)
            .then((response) => response.json())
            .then((response) => {
                if (response.hasOwnProperty('error')) {
                    res.json({ message: 'Invalid or expired token.' })
                } else {
                    res.locals.googleId = response.id
                    next()
                }
            })
    })

    /** Secures user-specific question routes to ensure users can only access/modify their own data.*/
    expressApp.use('/questions/:id/:accountId', (req, res, next) => {
        Account.findOne({
            googleId: res.locals.googleId,
        }).then((user) => {
            if (user._id.toString() !== req.params.accountId) {
                res.json({ message: 'Unauthorised user.' })
            } else {
                next()
            }
        })
    })

    /** Secures reply routes to require a Google OAuth token. */
    expressApp.use('/replies', (req, res, next) => {
        const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${req.query.token}`
        // Try retrieve profile info using token via Google API
        fetch(url)
            .then((response) => response.json())
            .then((response) => {
                if (response.hasOwnProperty('error')) {
                    res.json({ message: 'Invalid or expired token.' })
                } else {
                    res.locals.googleId = response.id
                    next()
                }
            })
    })

    /** Secures user-specific reply routes to ensure users can only access/modify their own data.*/
    expressApp.use('/replies/:id/:accountId', (req, res, next) => {
        Account.findOne({
            googleId: res.locals.googleId,
        }).then((user) => {
            if (user._id.toString() !== req.params.accountId) {
                res.json({ message: 'Unauthorised user.' })
            } else {
                next()
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
    expressApp.get('/questions/video/:id', questions.getVideoQuestions)
    expressApp.post('/questions', questions.createOne)
    expressApp.put('/questions/:id', questions.updateOne)
    expressApp.delete('/questions/:id', questions.deleteOne)
    expressApp.put('/questions/:id/:accountId/upvote', questions.upvote)
    expressApp.put('/questions/:id/:accountId/downvote', questions.downvote)
    expressApp.put('/questions/:id/:accountId/unvote', questions.removeVote)
    expressApp.put('/questions/:id/:accountId/report', questions.report)
    expressApp.delete(
        '/questions/:id/:accountId/report',
        questions.removeReport
    )

    // Reply RESTFul endpoints
    expressApp.get('/replies', replies.getAll)
    expressApp.get('/replies/:id', replies.getOne)
    expressApp.post('/replies', replies.createOne)
    expressApp.put('/replies/:id', replies.updateOne)
    expressApp.delete('/replies/:id', replies.deleteOne)
    expressApp.put('/replies/:id/:accountId/upvote', replies.upvote)
    expressApp.put('/replies/:id/:accountId/downvote', replies.downvote)
    expressApp.put('/replies/:id/:accountId/unvote', replies.removeVote)
    expressApp.put('/replies/:id/:accountId/report', replies.report)
    expressApp.delete('/replies/:id/:accountId/report', replies.removeReport)

    expressApp.get(
        '/auth/chrome',
        passport.authenticate('google-token'),
        (req, res) => {
            console.log(res)
            res.json(req.user)
        }
    )
}
