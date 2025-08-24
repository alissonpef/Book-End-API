const HttpError = require("../errors/HttpError");

function errorMiddleware(error, req, res, next) {
  if (error instanceof HttpError) {
    return res.status(error.status).json({ error: error.message });
  }

  console.error(error);

  return res.status(500).json({ error: "Internal Server Error" });
}

module.exports = errorMiddleware;
