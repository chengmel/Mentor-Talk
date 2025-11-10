const express = require('express');
const mentorController = require('./mentors.controller');
const authMiddleware = require('../../middleware/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', mentorController.listAllMentors);

module.exports = router;