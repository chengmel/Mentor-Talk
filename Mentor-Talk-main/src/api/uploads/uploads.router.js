const express = require('express');
const authMiddleware = require('../../middleware/auth.middleware');
const uploadMiddleware = require('../../middleware/uploads.middleware');

const router = express.Router();
router.use(authMiddleware);
router.post('/', uploadMiddleware.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: '파일이 업로드되지 않았습니다.' });
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/${req.file.path}`;

    res.status(201).json({
      message: '파일이 성공적으로 업로드되었습니다.',
      filePath: req.file.path,
      fileUrl: fileUrl
    });

  } catch (error) {
    console.error('파일 업로드 오류:', error);
    res.status(500).json({ message: '파일 업로드 중 오류가 발생했습니다.' });
  }
});

module.exports = router;