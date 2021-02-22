const { createRestaurant } = require('../../controllers/restaurant');
const { signUp, createrestaurant, updaterestaurant, addreview } = require('./schema');

exports.signUpValidation = async (req, res, next) => {
    const value = await signUp.validate(req.body);
    if(value.error) {
        res.json({
            success: 0,
            message: value.error.details[0].message
        })
    }
    next()
};

exports.createRestaurantValidation = async (req, res, next) => {
    const value = await createrestaurant.validate(req.body);
    if(value.error) {
        res.json({
            success: 0,
            message: value.error.details[0].message
        })
    }
    next()
};

exports.updateRestaurantValidation = async (req, res, next) => {
    const value = await updaterestaurant.validate(req.body);
    if(value.error) {
        res.json({
            success: 0,
            message: value.error.details[0].message
        })
    }
    next()
};

exports.addReviewValidation = async (req, res, next) => {
    const value = await addreview.validate(req.body);
    if(value.error) {
        res.json({
            success: 0,
            message: value.error.details[0].message
        })
    }
    next()
};