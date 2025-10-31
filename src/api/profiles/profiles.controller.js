const { Profile, User } = require('../../db');

const profileController = {
  async upsertMyProfile(req, res) {
    try {
      const userId = req.user.id;
      const userRole = req.user.role;

      if (userRole !== 'SENIOR') {
        return res.status(403).json({ message: '프로필 작성 권한이 없습니다.' });
      }

      const { school, major, graduation_year, company, job_title, bio, keywords } = req.body;

      let profile = await Profile.findOne({ where: { userId } });

      if (profile) {
        profile.school = school;
        profile.major = major;
        profile.graduation_year = graduation_year;
        profile.company = company;
        profile.job_title = job_title;
        profile.bio = bio;
        profile.keywords = keywords || profile.keywords;
        await profile.save();
      } else {
        profile = await Profile.create({
          school,
          major,
          graduation_year,
          company,
          job_title,
          bio,
          keywords,
          userId,
        });
      }

      res.status(200).json(profile);
    } catch (error) {
      console.error('서버 오류:', error);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  },

  async getMyProfile(req, res) {
    try {
      const userId = req.user.id;
      const profile = await Profile.findOne({ 
        where: { userId },
        include: [{ model: User, attributes: ['nickname', 'email'] }]
      });

      if (!profile) {
        return res.status(404).json({ message: '프로필을 찾을 수 없습니다.' });
      }

      res.status(200).json(profile);
    } catch (error) {
      console.error('서버 오류:', error);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  }
};

module.exports = profileController;