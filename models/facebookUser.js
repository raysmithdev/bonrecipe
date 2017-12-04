const mongoose = require('mongoose'),
    { Schema } = mongoose

const facebookSchema = new Schema({
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

const FacebookUser = mongoose.model('facebookUser', facebookSchema)
module.exports = FacebookUser