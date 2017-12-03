'use strict'
require('dotenv').config()
const express = require('express'),
    cors = require('cors'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
     morgan = require('morgan'),
    { DATABASE_URL, PORT } = require('./config')

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

require('./routes/recipeRoutes')(app)
app.use('/users', require('./routes/userRoutes'))

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

module.exports = { app }