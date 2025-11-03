const express = require("express");
const router = express.Router();
const user = require("../controllers/users.controller");
const authCtrl = require("../controllers/auth.controller");
const auth = require("../middleware/auth.middleware");
const capture = require("../middleware/request.middleware");

// User routes
router
  .get("/users", auth, capture, user.getUsers)
  .get("/users/top", user.getUserTopAge)
  .get("/users/:id", user.getUsersById)
  .get("/pagination", user.pagination)
  .post("/users", auth, user.postUsers)
  .put("/users/:id", auth, user.putUsers)
  .delete("/users/:id", auth, user.deleteUser);

// Extra routes
router
  .get("/age", auth, user.ageHandler)
  .get("/search", user.searchByName)
  .get("/sort", user.sortHandler);

// Auth routes
router
  .post("/register", authCtrl.createUser)
  .post("/login", authCtrl.loginUser)
  .post("/refresh", authCtrl.resetHandler);

module.exports = router;
