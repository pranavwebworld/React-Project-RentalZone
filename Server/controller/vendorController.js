const JWT = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const { signupSchema, loginSchema } = require("../helpers/validation_schema");
const Vendor = require("../models/vendor.model");
const createError = require("http-errors");
const { signAccessToken } = require("../helpers/jwt_helpers");
const { verifyAccessToken } = require("../helpers/jwt_helpers");
const { signRefreshToken } = require("../helpers/jwt_helpers");
const cookieParser = require("cookie-parser");
const {cloudinary}=require('../cloudinary/cloudinary')
router.use(cookieParser());




module.exports={

    register: async (req, res, next) => {
        try {
            const result = await signupSchema.validateAsync(req.body);
            const doesExist = await Vendor.findOne({ email: result.email });
            if (doesExist) {
                throw createError.Conflict(`${result.email} is already registered`);
            }

            const vendor = new Vendor(result);
            const savedVendor = await vendor.save();
            console.log({ savedVendor });
            const accessToken = await signAccessToken(savedVendor.id, savedVendor.name, savedVendor.propic);

            return res.status(200).json({
                vendorAccessToken: accessToken,
                message: "Logged in successfully 😊 👌",
            });
        } catch (error) {
            console.log(error.message);
            if (error.isJoi === true) error.status = 422;
            next(error);
        }
    },




    login: async (req, res, next) => {
        try {
            const result = await loginSchema.validateAsync(req.body);
            console.log(result);

            const vendor = await Vendor.findOne({ email: result.email });
            console.log({ vendor });
            if (!vendor) throw createError.NotFound("vendor not found");

            const isMatch = await vendor.isValidPassword(result.password);

            if (!isMatch)
                throw createError.Unauthorized("User name / password not valid");

            const accessToken = await signAccessToken(vendor.id, vendor.name,vendor.propic);

            // const refreshToken = await signRefreshToken(user.id);

            console.log({ accessToken });

            // res.send({ accessToken, refreshToken });
            return res.status(200).json({
                vendorAccessToken: accessToken,
                message: "Logged in successfully 😊 👌",
            });
        } catch (error) {
            console.log(error);
            if (error.isJoi === true)
                return next(createError.BadRequest("invalid username/password"));

            next(error);
        }
    },


    
    proPicUpload: async (req, res, next) => {
        try {

            const token = req.cookies.vendorAccessToken

            JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {

                if (err) {

                    console.log(err);
                }

            });

            console.log({token});
            const vendorId=token.aud
             console.log({vendor});

          
            const imgStr = req.body.base64Img;

            const uploadResponse = await cloudinary.uploader.upload(imgStr,{

             upload_preset:'Vendor_propics',

             allowedFormats: ["jpg", "png","jpeg"]

            })           
            console.log(uploadResponse);

            const imgUrl= uploadResponse.url

            console.log({imgUrl});  

            // const updateResp = await User.findByIdAndUpdate({ userId }, { "propic": imgUrl })
         
            // console.log({ updateResp });
            res.json({msg:"uploaded"})

            // const croppedimg = await cloudinary.url({PublicId},{ width: 400, height: 400,  crop: "limit" })
            // console.log(croppedimg);


        } catch (error) {

            console.log(error);
            next(error)

        }

    }

}
