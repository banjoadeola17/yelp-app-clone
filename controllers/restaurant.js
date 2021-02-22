const express = require('express');
const db = require('../db');

exports.getRestaurants = async (req, res, next) => {
    try {
        const results = await db.query('select * from restaurants left join (select restaurant_id, count(*), trunc(avg(rating),1) as avg_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;');
        if(!results) {
            const error = new Error('No restaurant found.');
            error.statusCode = 401;
            throw error;
        }
        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: {
                restaurants: results.rows
            }        
        });
    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getRestaurant = async (req, res, next) => {
    const { id } = req.params;
    try {
        const restaurant = await db.query(`SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as avg_rating from reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id WHERE id = $1;`, [id]);
        if(!restaurant) {
            const error = new Error('Restaurant not found.');
            error.statusCode = 404;
            throw error;
        }
        res.status(201).json({
            status: "success",
            data: {
                restaurant: restaurant.rows[0]
            }
        })
    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }   
};

exports.createRestaurant = async(req, res, next) => {
    const { name, location, price_range } = req.body;
    try {
        const restaurant = await db.query(
            'INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *', [name, location, price_range]);
        res.status(201).json({
            status: "success",
            data: {
                restaurant: restaurant.rows[0]
            }
        })
    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }   
};

exports.updateRestaurant = async (req, res, next) => {
    const { id } = req.params;
    const { name, location, price_range } = req.body;
    try {
        const updatedRestaurant = await db.query('UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *', [name, location, price_range, id]);
        console.log(updatedRestaurant);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: updatedRestaurant.rows[0]
            }
        })
    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }   
};

exports.deleteRestaurant = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedRestaurant = await db.query('DELETE FROM restaurants WHERE id = $1', [id]);
        res.status(204).json({
            status: "success"
        });
    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }  
};

exports.addReview = async (req, res, next) => {
    const { id } = req.params;
    const { name, review, rating } = req.body;
    try {
        const addedReview = await db.query(
            'INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) returning *', [id, name, review, rating]);
        res.status(201).json({
            status: 'success',
            data: {
                reviews: addedReview.rows[0]
            }
        });
    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};