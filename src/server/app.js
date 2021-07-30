require('dotenv').config()
const loaders = require('./loaders')
const cookieSession = require('cookie-session')
const express = require('express')
const cors = require('cors')

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

loaders(app)
