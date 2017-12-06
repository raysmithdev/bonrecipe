const passport = require('passport')

module.exports = app => {
    app.get('/auth/facebook', passport.authenticate('facebook', {
        session: false,
        scope: ['email']
    }))

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: 'http://localhost:3000/login', session: false }), (req, res) => {
            console.log(req.user)
            res.redirect(`http://localhost:3000/${req.user._id}/${req.user.email}/${req.user.first_name}/${req.user.service}`)
        })

    app.get('/auth/google', passport.authenticate('google', {
        session: false,
        scope: ['profile', 'email']
    }))

    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login', session: false }), (req, res) => {
        console.log(req.user)
        res.redirect(`http://localhost:3000/${req.user._id}/${req.user.email}/${req.user.first_name}/${req.user.service}`)
    })

    app.get('/auth/logout', (req, res) => {
        req.logout()
        res.redirect('http://localhost:3000/login')
    })
}