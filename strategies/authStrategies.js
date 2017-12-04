const passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy = require('passport-google-oauth20').Strategy,
    mongoose = require('mongoose'),
    { JWT_SECRET,
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        FB_APP_ID,
        FB_APP_SECRET } = require('../config'),
    GoogleUser = require('../models/googleUser'),
    FacebookUser = require('../models/facebookUser')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    GoogleUser.findById(id).then(user => {
        done(null, user)
    })
})

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    proxy: true
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            const existingUser = await GoogleUser.findOne({ id: profile.id })
            if (existingUser) {
                return done(null, existingUser)
            }

            const user = await new GoogleUser({
                id: profile.id,
                first_name: profile.name.givenName,
                last_name: profile.name.familyName,
                email: profile.emails[0].value
            }).save()
            done(null, user)
        } catch (error) {
            res.json({ error: error.message })
        }
    }
))

passport.use(new FacebookStrategy({
    clientID: FB_APP_ID,
    clientSecret: FB_APP_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'emails', 'name'],
    proxy: true
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            const existingUser = await FacebookUser.findOne({ id: profile.id })
            if (existingUser) {
                return done(null, existingUser)
            }

            const user = await new FacebookUser({
                id: profile.id,
                first_name: profile.name.givenName,
                last_name: profile.name.familyName,
                email: profile.emails[0].value
            }).save()
            done(null, user)
        } catch (error) {
            res.json({ error: error.message })
        }
    }
))