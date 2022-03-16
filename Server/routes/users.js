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
const userController = require('../controller/userController')



// @post user register
// @body user details
// @return JWT 


router.post("/register",userController.register );


// @post user register
// @body user details
// @return JWT 

router.post("/login",userController.login);


// @get user authorization
// @cookies JWT 
// @return boolean True or false 


router.get("/isLoggedIn", verifyAccessToken, async (req, res, next) => {
  console.log(req.payload);
});



// @post user propic
// 
// @return boolean True or false 

router.post("/proPicUpload", userController.proPicUpload)



module.exports = router;
 