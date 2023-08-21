const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 20,
    match: /^[a-zA-Z0-9]*$/gi
  },
  password: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/gi
  }
});

userSchema.plugin(uniqueValidator);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
