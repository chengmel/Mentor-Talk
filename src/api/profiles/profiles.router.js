const express = require('express');
const profileController = require('./profiles.controller');
const authMiddleware = require('../../middleware/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', profileController.createMyProfile);
router.get('/me', profileController.getMyProfile);

module.exports = router;