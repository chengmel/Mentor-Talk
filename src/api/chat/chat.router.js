const express = require('express');
const chatController = require('./chat.controller');
const authMiddleware = require('../../middleware/auth.middleware');

const router = express.Router();
router.use(authMiddleware);
router.post('/rooms', chatController.createOrGetChatRoom);
router.get('/rooms', chatController.listMyChatRooms);
router.get('/rooms/:roomId/messages', chatController.getMessagesByRoom);

module.exports = router;