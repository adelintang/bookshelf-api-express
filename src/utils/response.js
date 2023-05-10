const response = (statusCode, status, { message, data }, res) => {
  return res.status(statusCode).json({
    status,
    message,
    data,
  });
};

module.exports = response;