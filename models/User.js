const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs')

const userSchema = new Schema({
    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true
    },
    local: {
        email: {
            type: String,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            trim: true
        }
    },
    google: {
        id: {
            type: String
        },
        email: {
            type: String,
            trim: true,
            lowercase: true
        }
    },
    facebook: {
        id: {
            type: String
        },
        email: {
            type: String,
            trim: true,
            lowercase: true
        }
    }
})

userSchema.pre('save', async function (next) {
    try {
        //if strategy isn't local then continue with process since there's no PW
        if(this.method !== 'local'){
            next()
        }

        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(this.local.password, salt)
        //re-assign hash over original PW
        this.local.password = passwordHash
        next() // proceed to next operation
    } catch (error) {
        next(error)
    }
})

userSchema.methods.isValidPW = async function (newPassword) {
    try {
        //returns boolean so doesn't need to be put in var
        return await bcrypt.compare(newPassword, this.local.password)
    } catch (error) {
        //don't have access to next()
        throw new Error(error)
    }
}
const User = mongoose.model('user', userSchema)
module.exports = User
