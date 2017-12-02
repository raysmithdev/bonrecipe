'use strict'
require('dotenv').config()
const express = require('express'),
    cors = require('cors'),
    app = express(),
    bodyParser = require('body-parser'),
    axios = require('axios'),
    morgan = require('morgan'),
    { APP_ID, APP_KEY, PORT } = require('./config')

app.use(cors())
app.use(morgan('common'))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
    next()
})

app.get('/api/recipes', (req, res) => {
    axios.get(`http://api.yummly.com/v1/api/recipes?_app_id=${APP_ID}&_app_key=${APP_KEY}&maxResult=30&start=10`)
        .then((response) => {
            res.send(response.data.matches)
        })
        .catch((error) => {
            res.send(error)
            res.status(500).json({ message: 'Internal server error' })
        })
})
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

module.exports = { app }