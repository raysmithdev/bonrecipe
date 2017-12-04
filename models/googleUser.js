const mongoose = require('mongoose'),
    { Schema } = mongoose

const googleSchema = new Schema({
    id: {
        type: String
    },
    first_name: {
        type: String,
        trim: true,
    },
    last_name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    }
})

const GoogleUser = mongoose.model('googleUser', googleSchema)
module.exports = GoogleUser
