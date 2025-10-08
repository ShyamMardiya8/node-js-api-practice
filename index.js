const connectMongodb = require("./app/src/config/connections");
const errorHandler = require("./app/src/middleware/errorHandler.middleware");
const route = require("./app/src/routes/routes");
const express = require("express");
const fs = require("fs");
const { writeFile } = require("./app/src/utils/readFile");
const incomingRequestCaptureFunction = require("./app/src/middleware/request.middleware");
const notFoundMiddleware = require("./app/src/middleware/notFound.middleware");
const {
  clientConnectionHandler,
} = require("./app/src/config/redisConnections");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", route);
app.use(incomingRequestCaptureFunction);
app.use(notFoundMiddleware);
app.use(errorHandler);
connectMongodb();
clientConnectionHandler();
const writeAbleStream = fs.createWriteStream("./app/src/utils/output.txt");

for (let i = 0; i < 100; i++) {
  const isWrited = writeAbleStream.write(`line number is ${i + 1} \n`);
  if (!isWrited) {
    writeAbleStream.once("drain", () => {
      console.log("buffer drained");
    });
  }
}
writeAbleStream.end(() => {
  console.log("finished");
});
// console.info("🚀 ~ readFileData:", readFileData);
// writeFile();
app.listen(3000, () => {
  console.log(`server started ${3000}`);
});
