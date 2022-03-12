var express = require("express");
var app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const createErrors = require("http-errors");
require("dotenv").config();
require('./helpers/init_mongodb')

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var vendorsRouter = require("./routes/vendors");
var adminRouter = require("./routes/users");
const authRoute = require("./routes/auth");
const morgan = require("morgan");



app.use(morgan('dev'))

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/vendors", vendorsRouter);
app.use("/auth",authRoute)
app.use(async (req, res, next) => {
//   const error = new Error("not found");
//   error.status = 404;
  next(createErrors.NotFound("This route does not exist"));
});


app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

module.exports = app;
