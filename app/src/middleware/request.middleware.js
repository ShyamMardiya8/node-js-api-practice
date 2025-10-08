const fs = require("fs");
const incomingRequestCaptureFunction = (req, res, next) => {
  const timeStamp = new Date().toLocaleTimeString();
  const method = req.method;
  const url = req.originalUrl;

  const data = `${timeStamp} : ${method}, ${url}\n`;
  fs.appendFile("./requestlogger.txt", data, (err) => {
    if (err) throw err;
    console.log("file is saved");
  });
  next();
};

module.exports = incomingRequestCaptureFunction;
