const express = require('express');
const profileController = require('./profiles.controller');
const authMiddleware = require('../../middleware/auth.middleware');

const router = express.Router();
router.use(authMiddleware);
router.post('/me', profileController.upsertMyProfile);
router.get('/me', profileController.getMyProfile);

module.exports = router;