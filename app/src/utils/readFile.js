const fs = require("fs");

const readFile = () => {
  const readFileData = fs.readFile("./data.txt", "utf-8", (err, data) => {
    if (err) {
      console.log("err", err);
    }
    console.log(data, "file data");
  });
  console.info("🚀 ~ readFile ~ readFileData:", readFileData);
};

const writeFile = () => {
  fs.writeFile("./write.txt", "test write function is working", (err) => {
    if (err) {
      console.log(err);
    }
  });
};
module.exports = { readFile, writeFile };
