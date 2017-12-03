const JWT = require('jsonwebtoken'),
    { JWT_SECRET } = require('../config'),
    User = require('../models/User')

signToken = user => {
    return JWT.sign({
        iss: 'BonRecipe',
        sub: user._id,
        iat: new Date().getTime(), // current time
        exp: new Date().setDate(new Date().getDate() + 1) //24hours from curr time
    }, JWT_SECRET)
}

module.exports = {
    signup: async (req, res, next) => {
        const { email, password } = req.value.body
        const foundUser = await User.findOne({ 'local.email': email })

        if (foundUser) {
            return res.status(403).json({ error: 'Duplicate Email Found' })
        }
        const newUser = new User({
            method: 'local',
            local: {
                email: email,
                password: password
            }
        })
        await newUser.save()

        const token = signToken(newUser)
        res.status(200).json({ token })
    },
    signin: async (req, res, next) => {
        const token = signToken(req.user)
        res.status(200).json({ token })
    },
    secret: async (req, res, next) => {
        res.json({ secret: "resource" })
    },
    googleOAuth: async (req, res, next) => {
        const token = signToken(req.user)
        res.status(200).json({ token })
    },
    fbOAuth: async (req, res, next) => {
        const token = signToken(req.user)     
        res.status(200).json({ token })
    }
}