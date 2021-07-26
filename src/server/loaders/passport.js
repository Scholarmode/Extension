const passport = require('passport')
const GoogleStrategy = require('passport-google-token').Strategy
const Account = require('../models/account')
const mongoose = require('mongoose')

module.exports = async (expressApp) => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.G_CLIENT_ID,
                clientSecret: process.env.G_CLIENT_SECRET,
            },
            (accessToken, refreshToken, profile, done) => {
                Account.findOne({ googleId: profile.id }).then(
                    (currentUser) => {
                        if (currentUser) {
                            done(null, currentUser)
                        } else {
                            // Save to the account collection
                            let newAccountDetails = profile._json
                            newAccountDetails._id = new mongoose.Types.ObjectId()
                            newAccountDetails.googleId = profile.id

                            let account = new Account(newAccountDetails)
                            account.save((newUser) => {
                                done(null, newUser)
                            })
                        }
                    }
                )
            }
        )
    )

    passport.serializeUser(function (user, done) {
        done(null, user)
    })

    passport.deserializeUser(function (user, done) {
        done(null, user)
    })

    expressApp.use(passport.initialize())
    expressApp.use(passport.session())

    expressApp.get(
        '/auth/chrome',
        passport.authenticate('google-token'),
        (req, res) => {
            console.log(res)
            res.json(req.user)
        }
    )
}
