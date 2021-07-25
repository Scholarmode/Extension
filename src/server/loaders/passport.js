const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const Account = require('./models/account')
const mongoose = require('mongoose')

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.G_CLIENT_ID,
            clientSecret: process.env.G_CLIENT_SECRET,
        },
        (accessToken, refreshToken, profile, done) => {
            Account.findOne({ googleId: profile.id }).then((currentUser) => {
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
            })
        }
    )
)

const passportLoader = async (expressApp) => {
    expressApp.get(
        '/auth/chrome',
        passport.authenticate('google', {
            scope: ['https://www.googleapis.com/auth/plus.login'],
        }),
        (req, res) => {
            res.json(req.user)
        }
    )
}

export default passportLoader
