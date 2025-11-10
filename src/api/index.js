const express = require('express');
const authRouter = require('./auth/auth.router');
const userRouter = require('./users/users.router');
const profileRouter = require('./profiles/profiles.router');
const mentorRouter = require('./mentors/mentors.router');
const chatRouter = require('./chat/chat.router');
const uploadRouter = require('./uploads/uploads.router');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/profiles', profileRouter);
router.use('/mentors', mentorRouter);
router.use('/chat', chatRouter);
router.use('/uploads', uploadRouter);

module.exports = router;