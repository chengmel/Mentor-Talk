const { User } = require('../../db');

const userController = {
  async getMyProfile(req, res) {
    try {
      const userId = req.user.id;

      const user = await User.findByPk(userId, {
        attributes: { exclude: ['password'] },
      });

      if (!user) {
        return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error('서버 오류:', error);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  },
};

module.exports = userController;