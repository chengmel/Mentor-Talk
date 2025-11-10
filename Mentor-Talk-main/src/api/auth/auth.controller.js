const bcrypt = require('bcryptjs'); // ✅ 여기만 변경
const jwt = require('jsonwebtoken');
const { User } = require('../../db');

const authController = {
  async register(req, res) {
    const { email, password, nickname, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      const error = new Error('이미 가입된 이메일입니다.');
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 그대로 사용

    const newUser = await User.create({
      email,
      password: hashedPassword,
      nickname,
      role,
    });

    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      nickname: newUser.nickname,
      role: newUser.role,
      createdAt: newUser.createdAt,
    });
  },

  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      const error = new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
      error.statusCode = 401;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // 그대로 사용
    if (!isPasswordValid) {
      const error = new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
      error.statusCode = 401;
      throw error;
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: '로그인 성공!',
      token: token,
    });
  },
};

module.exports = authController;
