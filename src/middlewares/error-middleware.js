const HttpError = require("../errors/HttpError");

module.exports = (error, req, res, next) => {
  console.error(error);

  if (error instanceof HttpError) {
    return res.status(error.status).json({ message: error.message });
  }

  return res.status(500).json({ message: 'Internal Server Error' });
};