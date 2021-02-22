const express = require('express');
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res, next) => {
    const { name, email, pword } = req.body;
    try {     
        const password = await bcrypt.hash(pword, 10);
        const user = await db.query("INSERT INTO users(name, email, password) VALUES ($1, $2, $3) returning *", [name, email, password]);
        console.log(user)
        res.status(201).json({
            message: 'User created',
            status: 'success',
            data: {
                userId: user.rows[0].id        
            }
        });
    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }   
};

exports.logIn = async (req, res, next) => {
    const { email, pword } = req.body;
    let loadedUser;
    try {
        const user = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        console.log(user.rows[0].password)
        if(!user) {
            const error = new Error('Email does not match.');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        const isEqual = bcrypt.compare(pword, user.rows[0].password);
        if(!isEqual) {
            const error = new Error('Email or password does not match.');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
            email: loadedUser.rows[0].email,
            userId: loadedUser.rows[0].id
        }, 'somesupersecret', { 
            expiresIn: '1h'
        });
        res.status(201).json({
            message: 'User logged in',
            status: 'success',
            data: {
                userdetails: {
                    token: token,
                    userId: loadedUser.rows[0].id
                }
            }      
        })
    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};