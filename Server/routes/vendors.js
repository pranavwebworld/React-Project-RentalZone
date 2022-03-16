const express = require("express");
const router = express.Router();
const { signupSchema, loginSchema } = require("../helpers/validation_schema");
const Vendor = require("../models/vendor.model");
const createError = require("http-errors");
const { signAccessToken } = require("../helpers/jwt_helpers");
const { verifyVendorAccessToken } = require("../helpers/jwt_helpers");
const { signRefreshToken } = require("../helpers/jwt_helpers");
const cookieParser = require("cookie-parser");
router.use(cookieParser());
const vendorController = require('../controller/vendorController')





// @post vendor register
// @body vendor details
// @return JWT 


router.post("/register", vendorController.register);


// @post vendorregister
// @body vendorr details
// @return JWT 

router.post("/login", vendorController.login);


// @get user authorization
// @cookies JWT 
// @return boolean True or false 


router.get("isVLoggedIn", verifyVendorAccessToken, async (req, res, next) => {

    console.log(req.payload);

});



// @post vendor propic
// 
// @return boolean True or false 

router.post("/vendor/proPicUpload", vendorController.proPicUpload)



module.exports = router;
