const Joi = require('joi')

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema)
            if (result.error) {
                return res.status(400).json(result.error)
            }
            if (!req.value) req.value = {} //if no value then initialize to empty object
            req.value['body'] = result.value
            next() // <= needed to not block call to userRoutes
        }
    },
    schemas: {
        authSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    }
}