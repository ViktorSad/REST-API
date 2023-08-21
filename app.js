var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
require("dotenv").config();
const mongoose = require("mongoose");
const moviesRouter = require("./routes/movies");
const aboutRouter = require("./routes/about");
const db = require("./config/db");
var app = express();
//  start DB
db();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/movies", moviesRouter);
app.use("/about", aboutRouter);

module.exports = app;
