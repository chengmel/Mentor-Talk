const express = require('express');
const authRouter = require('./auth/auth.router');
const userRouter = require('./users/users.router');
const profileRouter = require('./profiles/profiles.router');
const seniorRouter = require('./seniors/seniors.router');
const chatRouter = require('./chat/chat.router');
const uploadRouter = require('./uploads/uploads.router');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/profiles', profileRouter);
router.use('/seniors', seniorRouter);
router.use('/chat', chatRouter);
router.use('/uploads', uploadRouter);

module.exports = router;