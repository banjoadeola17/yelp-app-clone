const express = require('express');
const restaurantController = require('../controllers/restaurant');
const { createRestaurantValidation, updateRestaurantValidation, addReviewValidation } = require('../validation/auths/validation');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/restaurants', isAuth, restaurantController.getRestaurants);

router.get('/restaurants/:id', isAuth, restaurantController.getRestaurant);

router.post('/restaurants', isAuth, createRestaurantValidation, restaurantController.createRestaurant);

router.put('/restaurants/:id', isAuth, updateRestaurantValidation, restaurantController.updateRestaurant);

router.delete('/restaurants/:id', isAuth, restaurantController.deleteRestaurant);

router.post('/restaurants/:id/addReview', isAuth, addReviewValidation, restaurantController.addReview);

module.exports = router;