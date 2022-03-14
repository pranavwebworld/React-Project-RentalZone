const express = require("express");
const router = express.Router();
const { signupSchema, loginSchema } = require("../helpers/validation_schema");
const User = require("../models/user.model");
const createError = require("http-errors");
const { signAccessToken } = require("../helpers/jwt_helpers");
const { verifyAccessToken } = require("../helpers/jwt_helpers");
const { signRefreshToken } = require("../helpers/jwt_helpers");
const cookieParser = require("cookie-parser");
router.use(cookieParser());
const AuthController = require('../controller/userController')




/**
 * 
 * 
 */
router.post("/register",AuthController.register );






router.post("/login",AuthController.login);






router.get("/isLoggedIn", verifyAccessToken, async (req, res, next) => {
  console.log(req.payload);
});





module.exports = router;
