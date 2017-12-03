const axios = require('axios'),
    { YUM_APP_ID, YUM_APP_KEY } = require('../config')

module.exports = app => {
    app.get('/api/recipes', (req, res) => {
        axios.get(`http://api.yummly.com/v1/api/recipes?_app_id=${YUM_APP_ID}&_app_key=${YUM_APP_KEY}&maxResult=30&start=10`)
            .then((response) => {
                res.send(response.data.matches)
            })
            .catch((error) => {
                res.send(error)
                res.status(500).json({ message: 'Internal server error' })
            })
    })
}