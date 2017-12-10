const axios = require('axios'),
    querystring = require('querystring')

module.exports = app => {
    fbUser = require('../models/facebookUser'),
        gooUser = require('../models/googleUser')
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
                if (!items.recipes) {
                    res.send('No Items to Display')
                }
                res.send([items.recipes.sys_recipes, items.recipes.user_recipes])
            })
        } catch (error) {
            res.send(error)
        }
    })

    app.post('/sysrecipes/add/:id/:service', (req, res) => {
        try {
            if (req.params.service === 'facebook') {
                User = fbUser
            }
            if (req.params.service === 'google') {
                User = gooUser
            }

            User.update({
                _id: req.params.id
            }, {
                    $addToSet: {
                        'recipes.sys_recipes': {
                            id: req.body[0],
                            name: req.body[1],
                            ingredients: req.body[2],
                            image: req.body[3],
                            cookTime: req.body[4]
                        }
                    },
                },
                (err, response) => {
                    if (err) {
                        res.send(err)
                    }
                    res.send(response)
                })
        } catch (error) {
            res.send(error)            
        }
    })
}