'use strict'
require('dotenv').config()
const express = require('express'),
    cors = require('cors'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cookieSession = require('cookie-session'),
    passport = require('passport'),
    morgan = require('morgan'),
    { DATABASE_URL, PORT, COOKIE_KEY } = require('./config')

require('./models/googleUser')
require('./models/facebookUser')
require('./strategies/authStrategies')

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
    next()
})

mongoose.Promise = global.Promise
mongoose.connect(DATABASE_URL, { useMongoClient: true })
mongoose.connection.once('open', () => {
    console.log('Mongo Connection Opened!')
}).on('error', (error) => console.warn('Warning ', error))

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [COOKIE_KEY]
    })
)
app.use(passport.initialize())
app.use(passport.session())

require('./routes/recipeRoutes')(app)
require('./routes/authRoutes')(app)

// app.use('/users', require('./routes/userRoutes'))

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
module.exports = { app }