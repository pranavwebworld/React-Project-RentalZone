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


router.get("/isVLoggedIn", verifyVendorAccessToken, async (req, res, next) => {

    var payload = req.payload
    console.log(req.payload);
    res.json({ payload })


});



// @post vendor propic
// @return boolean True or false 

router.post("/proPicUpload", vendorController.proPicUpload)




// @get params userId
// @return matched users

router.get("/getbyId", vendorController.getById);




// @post Product picture 
//@body vendoId
// @return upload response


router.post("/productPicUpload", vendorController.proPicUpload)




router.post("/productRegister", vendorController.productRegister)

module.exports = router;
