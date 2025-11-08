const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array()[0].msg });
};

const registerValidator = [
  body('email')
    .notEmpty().withMessage('이메일은 필수 입력 항목입니다.')
    .isEmail().withMessage('올바른 이메일 형식을 입력해주세요.'),
  
  body('password')
    .notEmpty().withMessage('비밀번호는 필수 입력 항목입니다.')
    .isLength({ min: 8 }).withMessage('비밀번호는 최소 8자 이상이어야 합니다.'),

  body('nickname')
    .notEmpty().withMessage('닉네임은 필수 입력 항목입니다.')
    .isLength({ min: 2, max: 15 }).withMessage('닉네임은 2자 이상 15자 이하로 설정해주세요.'),

  body('role')
    .isIn(['JUNIOR', 'SENIOR']).withMessage('역할은 JUNIOR 또는 SENIOR여야 합니다.'),
  
  validate
];

const loginValidator = [
  body('email')
    .notEmpty().withMessage('이메일은 필수 입력 항목입니다.')
    .isEmail().withMessage('올바른 이메일 형식을 입력해주세요.'),
  
  body('password')
    .notEmpty().withMessage('비밀번호는 필수 입력 항목입니다.'),

  validate
];


module.exports = {
  registerValidator,
  loginValidator,
};