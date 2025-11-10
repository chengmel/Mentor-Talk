const { User, Profile } = require('../../db');
const { Op } = require('sequelize');

const mentorController = {
  async listAllMentors(req, res) {
    const myUserId = req.user.id;

    const findOptions = {
      where: {
        userId: {
          [Op.ne]: myUserId
        }
      },
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
        required: true,
      }],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    };

    const mentors = await Profile.findAll(findOptions);

    res.status(200).json(mentors);
  }
};

module.exports = mentorController;