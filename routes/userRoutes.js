const express = require('express'),
    router = require('express-promise-router')(),
    passport = require('passport'),
    passportConfig = require('../passport'),
    userController = require('../controllers/users'),
    { validateBody, schemas } = require('../helpers/routeHelpers')

const passportType = type => {
    return passport.authenticate(type, { session: false })
}
router.route('/signup')
    .post(validateBody(schemas.authSchema), userController.signup)

router.route('/signin')
    .post(validateBody(schemas.authSchema), passportType('local'), userController.signin)

router.route('/secret')
    // session false means we're using api instead. jwt is the strat being used to auth with passport
    .get(passportType('jwt'), userController.secret)

router.route('/oauth/google')
    .post(passportType('googleToken'), userController.googleOAuth)

router.route('/oauth/facebook')
    .post(passportType('facebookToken'), userController.fbOAuth)

module.exports = router