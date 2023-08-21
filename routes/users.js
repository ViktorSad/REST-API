const express = require("express");
const {
  getUsers,
  getProfile,
  login,
  register,
  logout
} = require("../controller/userController");
var { isTokenValid } = require("../middlewares/index");
var router = express.Router();

/* GET users listing. */
router.get("/", getUsers);
router.get("/profile", isTokenValid, getProfile);

// POST requests
router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

module.exports = router;
