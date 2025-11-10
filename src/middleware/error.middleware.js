const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = err.statusCode || 500;
  let message = err.message || '서버에서 예상치 못한 오류가 발생했습니다.';

  res.status(statusCode).json({
    status: 'error',
    statusCode: statusCode,
    message: message,
  });
};

module.exports = errorHandler;