const passport = require('passport'),
    JWTStrategy = require('passport-jwt').Strategy,
    { ExtractJwt } = require('passport-jwt'),
    LocalStrategy = require('passport-local').Strategy,
    { JWT_SECRET,
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        FB_APP_ID,
        FB_APP_SECRET } = require('./config'),
    User = require('./models/User')

//JWT Strategy
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET //decode
}, async (payload, done) => {
    try {
        //find user from token
        const user = await User.findById(payload.sub)
        //if user doesn't exist, handle
        if (!user) {
            return done(null, false)
        }
        // or just return user
        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))

// Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        // find the user by email
        const user = await User.findOne({ 'local.email': email })
        // if none, handle
        if (!user) {
            return done(null, false)
        }
        // auth password
        const isMatch = await user.isValidPW(password)
        // if none, handle
        if (!isMatch) {
            return done(null, false)
        }
        // or just return user 
        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))

// Google Strategy
// passport.use('googleToken', new GooglePlusTokenStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET
// }, async (accessToken, refreshToken, profile, done) => {
//     try {
//         console.log('pf', profile)
//         //check if current user is in DB
//         const existingUser = await User.findOne({ "google.id": profile.id })
//         if (existingUser) {
//             console.log('User already exists in our records')
//             return done(null, existingUser)
//         }

//         //if new account
//         console.log('User does not exist. New user account will be created')
//         const newUser = new User({
//             method: 'google',
//             google: {
//                 id: profile.id,
//                 email: profile.emails[0].value
//             }
//         })
//         await newUser.save()
//         done(null, newUser)
//     } catch (error) {
//         done(error, false, error.message)
//     }
// }))

// // Facebook Strategy
// passport.use('facebookToken', new FacebookTokenStrategy({
//     clientID: FB_APP_ID,
//     clientSecret: FB_APP_SECRET
// }, async (accessToken, refreshToken, profile, done) => {
//     try {
//         console.log('pf', profile)
//         const existingUser = await User.findOne({ "facebook.id": profile.id })
//         if (existingUser) {
//             console.log('User already exists in our records')
//             return done(null, existingUser)
//         }

//         console.log('User does not exist. New user account will be created')
//         const newUser = new User({
//             method: 'facebook',
//             facebook: {
//                 id: profile.id,
//                 email: profile.emails[0].value
//             }
//         })
//         await newUser.save()
//         done(null, newUser)
//     } catch (error) {
//         done(error, false, error.message)
//     }
// }))