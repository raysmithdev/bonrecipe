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
    },
    service: {
        type: String
    },
    recipes: {
        sys_recipes: Array,
        user_recipes: Array
    }
})

const GoogleUser = mongoose.model('googleUser', googleSchema)
module.exports = GoogleUser
