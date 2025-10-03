const errorHandler = async (err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    statusCode,
    name: err.name || "InternalServerError",
    message: err.message || "Internal Server Error",
  });
};
module.exports = errorHandler;
