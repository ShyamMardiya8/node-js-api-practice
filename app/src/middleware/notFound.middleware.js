const notFoundMiddleware = (req, res) => {
  res.status(404);
  res.json({
    message: "Resource not Found",
    path: req.originalUrl,
  });
};

module.exports = notFoundMiddleware;
