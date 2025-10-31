const express = require('express');
const authController = require('./auth.controller');
const { registerValidator, loginValidator } = require('../../validators/auth.validator');

const router = express.Router();
router.post('/register', registerValidator, authController.register);
router.post('/login', loginValidator, authController.login);

module.exports = router;