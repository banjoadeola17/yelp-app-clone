const express = require('express');
const authController = require('../controllers/auth');
const { signUpValidation } = require('../validation/auths/validation');

const router = express.Router();

router.put('/auth/signup', signUpValidation, authController.signUp);

router.post('/auth/login', authController.logIn);

module.exports = router;