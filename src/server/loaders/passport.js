const passport = require('passport')
const mongoose = require('mongoose')
const GoogleStrategy = require('passport-google-token').Strategy
const Account = require('../models/account')

module.exports = async (expressApp) => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.G_CLIENT_ID,
                clientSecret: process.env.G_CLIENT_SECRET,
            },
            (accessToken, refreshToken, profile, done) => {
                Account.findOne({ googleId: profile.id }).then((user) => {
                    if (!user) {
                        let newAccountDetails = profile._json
                        newAccountDetails._id = new mongoose.Types.ObjectId()
                        newAccountDetails.googleId = profile.id
                        let account = new Account(newAccountDetails)
                        account.save((newUser) => {
                            done(null, newUser)
                        })
                    }
                    return done(null, user)
                })
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
}
