const { Profile, User } = require('../../db');

const profileController = {
  async createMyProfile(req, res) {
    const userId = req.user.id;
    const { school, major, company, job_title, bio, keywords } = req.body;

    const existingProfile = await Profile.findOne({ where: { userId } });
    if (existingProfile) {
      const error = new Error('프로필이 이미 존재합니다. 수정 기능을 이용해주세요.');
      error.statusCode = 409;
      throw error;
    }

    if (!school || !major || !keywords || keywords.length === 0) {
        const error = new Error('학교, 전공, 키워드는 필수 입력 항목입니다.');
        error.statusCode = 400;
        throw error;
    }

    const newProfile = await Profile.create({
      school,
      major,
      company,
      job_title,
      bio,
      keywords,
      userId,
    });

    res.status(201).json(newProfile);
  },

  async getMyProfile(req, res) {
    const userId = req.user.id;
    const profile = await Profile.findOne({ 
      where: { userId },
      include: [{ model: User, attributes: ['nickname', 'email'] }]
    });

    if (!profile) {
      const error = new Error('아직 작성된 프로필이 없습니다.');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(profile);
  },

  async updateMyProfile(req, res) {
    //
  }
};

module.exports = profileController;