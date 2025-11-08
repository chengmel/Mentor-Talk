const express = require('express');
const userController = require('./users.controller');
const authMiddleware = require('../../middleware/auth.middleware');

const router = express.Router();

router.get('/me', authMiddleware, userController.getMyProfile);

module.exports = router;