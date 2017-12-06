const axios = require('axios')


module.exports = app => {
    fbUser = require('../models/facebookUser'),
        gooUser = require('../models/googleUser'),
        { YUM_APP_ID, YUM_APP_KEY } = require('../config'),
        User = ''

    app.get('/recipes/:id/:service', (req, res) => {
        try {
            if (req.params.service === 'facebook') {
                 User = fbUser
            }
            if (req.params.service === 'google') {
                 User = gooUser
            }

            User.findById(req.params.id, (err, items) => {
                if (err) {
                    res.send(err)
                }
                // if (items[req.params.type] === undefined) {
                //     res.send('No Items to Display')
                // }
                // res.json({ sys_recipes: items.recipes[0].sys_recipes, user_recipes: items.recipes[0].user_recipes})
                res.send([items.recipes[0].sys_recipes, items.recipes[0].user_recipes])
                // console.log(items)
                console.log(items.recipes[0].user_recipes)
            })
        } catch (error) {
            res.json({ error: error.message })
        }
    })
}