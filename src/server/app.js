require('dotenv').config()
const loaders = require('./loaders')
const cookieSession = require('cookie-session')
const express = require('express')
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

loaders(app)
