const app = require("express");
const userHandlers = require("../controllers/users.controller");
const userAuth = require("../controllers/auth.controller");

const route = app.Router();

route.get("/users", userHandlers.getUsers);
route.get("/users/top", userHandlers.getUserTopAge);
route.get("/users/:id", userHandlers.getUsersById);
route.post("/users", userHandlers.postUsers);
route.put("/users/:id", userHandlers.putUsers);
route.delete("/users/:id", userHandlers.deleteUser);
route.post("/register", userAuth.createUser);
route.post("/login", userAuth.loginUser);
module.exports = route;
