const connectMongodb = require("./app/src/config/connections");
const errorHandler = require("./app/src/middleware/errorHandler.middleware");
const route = require("./app/src/routes/routes");
const express = require("express");

const app = express();
app.use(express.json());
app.use("/api", route);
app.use(errorHandler);
connectMongodb();
app.listen(3000, () => {
  console.log(`server started ${3000}`);
});
