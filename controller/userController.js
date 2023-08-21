const UserModel = require("../model/users");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getUsers = (req, res, next) => {
  UserModel.find({}).then((users) => {
    res.json(users);
  });
};

const getProfile = (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let decoded = jwt.decode(token, {
    complete: true
  });
  UserModel.find({
    username: decoded.payload.username
  }).then((user) => {
    res.status(200).json(user[0]);
  });
};
// Login controller with creating token
const login = async (req, res) => {
  let result = await UserModel.find({ username: req.body.username });
  let isUserFound = result.length > 0;
  isUserFound
    ? (await bcrypt.compare(req.body.password, result[0].password))
      ? res.status(200).json({
          message: "user_logged_in",
          //  creating token
          token: jwt.sign(
            { username: req.body.username, date: new Date().getTime() }, // Payload  do not include password in the token
            process.env.JWT_KEY, // secret key
            { algorithm: "HS256", expiresIn: "1h" } //token options
          )
        })
      : res.status(401).json({
          message: "Not allowed. Username/Password is incorrect"
        })
    : res.status(401).json({
        message: "User not found"
      });
};

const register = async (req, res) => {
  try {
    const userObj = req.body;
    let user =
      (await UserModel.find({ username: userObj.username })).length > 0
        ? true
        : false;

    if (!user) {
      if (
        !userObj.password.match(
          /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
        )
      ) {
        throw new TypeError("password didn't pass requirements ");
      }
      let hashed = await bcrypt.hash(userObj.password, 10);
      userObj.password = hashed;
      let newUser = new UserModel(userObj);
      const result = await newUser.save();
      res.status(201).json(result);
    } else {
      res.status(200).json({
        message: "Choose another username"
      });
    }
  } catch (error) {
    res.status(401).json({
      message: error.message
    });
  }
};
const logout = (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  memoryCache.put(token, token, 1000 * 60 * 60);
  res.status(200).json({
    message: "user logged out"
  });
};
// exports controllers
module.exports = {
  getUsers,
  getProfile,
  login,
  register,
  logout
};
