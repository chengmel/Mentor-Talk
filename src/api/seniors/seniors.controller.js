const { User, Profile } = require('../../db');
const { Op } = require('sequelize');

const seniorController = {
  async listAllSeniors(req, res) {
    try {
      const { keyword } = req.query;
      const findOptions = {
        include: [{
          model: User,
          attributes: ['nickname'],
          where: { role: 'SENIOR' },
          required: true,
        }],
        attributes: ['id', 'school', 'major', 'company', 'job_title', 'bio', 'userId', 'keywords']
      };

      if (keyword) {
        findOptions.where = {
          keywords: {
            [Op.contains]: [keyword]
          }
        };
      }

      const seniors = await Profile.findAll(findOptions);

      res.status(200).json(seniors);
    } catch (error) {
      console.error('서버 오류:', error);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  }
};

module.exports = seniorController;