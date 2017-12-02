'use strict'
exports.DATABASE_URL =
    process.env.DATABASE_URL ||
    global.DATABASE_URL 
exports.PORT = process.env.PORT || 5000
exports.APP_ID = process.env.APP_ID
exports.APP_KEY = process.env.APP_KEY
