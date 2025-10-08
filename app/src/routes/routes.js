const app = require("express");
const userHandlers = require("../controllers/users.controller");
const userAuth = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const incomingRequestCaptureFunction = require("../middleware/request.middleware");

const route = app.Router();

route.get(
  "/users",
  authMiddleware,
  incomingRequestCaptureFunction,
  userHandlers.getUsers
);
route.get("/users/top", userHandlers.getUserTopAge);
route.get("/users/:id", userHandlers.getUsersById);
route.get("/pagination", userHandlers.pagination);
route.post("/users", authMiddleware, userHandlers.postUsers);
route.get("/age", authMiddleware, userHandlers.ageHandler);
route.put("/users/:id", authMiddleware, userHandlers.putUsers);
route.get("/search", userHandlers.searchByName);
route.get("/sort", userHandlers.sortHandler);
route.delete("/users/:id", authMiddleware, userHandlers.deleteUser);
route.post("/register", userAuth.createUser);
route.post("/login", userAuth.loginUser);
route.post("/refresh", userAuth.resetHandler);
module.exports = route;
