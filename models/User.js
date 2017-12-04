const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs')

const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        trim: true
    }
})

userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(this.password, salt)
        this.password = passwordHash
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.methods.isValidPW = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password)
    } catch (error) {
        throw new Error(error)
    }
}
const User = mongoose.model('user', userSchema)
module.exports = User
