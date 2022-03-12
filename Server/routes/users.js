const express = require("express");
const router = express.Router();
const { authSchema } = require("../helpers/validation_schema");
const User = require("../models/user.model");
const createError = require("http-errors");
const { signAccessToken } = require("../helpers/jwt_helpers");

router.post("/register", async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    const doesExist = await User.findOne({ email: result.email });
    if (doesExist) {
      throw createError.Conflict(`${result.email} is already registered`);
    }
    const user = new User(result);
    const savedUser = await user.save();

    const accessToken = await signAccessToken(savedUser.id);

    console.log(accessToken);
    res.send(accessToken);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;

    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    console.log(result);

    const user = await User.findOne({ email: result.email });
    console.log({ user });
    if (!user) throw createError.NotFound("User not found");

    const isMatch = await user.isValidPassword(result.password);

    if (!isMatch)
      throw createError.Unauthorized("User name / password not valid");

    const accessToken = await signAccessToken(user.id);

    console.log(accessToken);

    res.send(accessToken);

  } catch (error) {
    if (error.isJoi === true)
      return next(createError.BadRequest("invalid username/password"));

    next(error);
  }
});

router.post("/refresh-token", async (req, res, next) => {
  res.send("refresh token route ");
});



router.post("/protected", async (req, res, next) => {

  console.log(req.headers['authorization']);

  res.send("Protected");
});





router.delete("/logout", async (req, res, next) => {
  res.send("logout ");
});

module.exports = router;
