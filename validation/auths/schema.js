const joi = require('@hapi/joi');

const schema = {
    signUp: joi.object({
        name: joi.string().max(50).required(),
        email: joi.string().max(50).required(),
        pword: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required()
    }),

    createrestaurant: joi.object({
        name: joi.string().max(50).required(),
        location: joi.string().max(50).required(),
        price_range: joi.number().min(1).max(5).required()
    }),

    updaterestaurant: joi.object({
        name: joi.string().max(50).required(),
        location: joi.string().max(50).required(),
        price_range: joi.number().min(1).max(5).required()
    }),

    addreview: joi.object({
        name: joi.string().max(50).required(),
        review: joi.string().required(),
        rating: joi.number().min(1).max(5).required()
    })
}

module.exports = schema;