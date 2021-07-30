require('dotenv').config()
const loaders = require('./loaders')
const cookieSession = require('cookie-session')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

app.listen(8080)
console.log('Listening on port 8080')

app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        keys: [process.env.S_COOKIE_KEY],
    })
)

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
