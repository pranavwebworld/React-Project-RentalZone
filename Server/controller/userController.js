
const express = require("express");
const router = express.Router();
const { signupSchema, loginSchema } = require("../helpers/validation_schema");
const User = require("../models/user.model");
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
            const doesExist = await User.findOne({ email: result.email });
            if (doesExist) {
                throw createError.Conflict(`${result.email} is already registered`);
            }
            const user = new User(result);
            const savedUser = await user.save();
            console.log({ savedUser });
            const accessToken = await signAccessToken(savedUser.id, savedUser.name);

            return res.status(200).json({
                userAccessToken: accessToken,
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

            const user = await User.findOne({ email: result.email });
            console.log({ user });
            if (!user) throw createError.NotFound("User not found");

            const isMatch = await user.isValidPassword(result.password);

            if (!isMatch)
                throw createError.Unauthorized("User name / password not valid");

            const accessToken = await signAccessToken(user.id, user.name);
            // const refreshToken = await signRefreshToken(user.id);

            console.log({ accessToken });

            // res.send({ accessToken, refreshToken });

            return res.status(200).json({
                userAccessToken: accessToken,
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

            const imgStr = req.body.base64Img;
            const uploadResponse = await cloudinary.uploader.upload(imgStr,{

             upload_preset:'User_propics'

            })           

            console.log(uploadResponse);
            res.json({msg:"uploaded"})

            const croppedimg = await cloudinary.url("User_propics/uxh0edsoetdmcr9u3mzz", { width: 400, height: 400,  crop: "limit" })

            console.log(croppedimg);


        } catch (error) {

            console.log(error);
            next(error)

        }

    }

}
