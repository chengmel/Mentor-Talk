const express = require('express');
const seniorController = require('./seniors.controller');
const authMiddleware = require('../../middleware/auth.middleware');
const router = express.Router();
router.use(authMiddleware);
router.get('/', seniorController.listAllSeniors);

module.exports = router;