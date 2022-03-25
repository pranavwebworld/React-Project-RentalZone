const JWT = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const { signupSchema, loginSchema,ProductSchema } = require("../helpers/validation_schema");
const Vendor = require("../models/vendor.model");
const Product=require("../models/ProductModel")
const createError = require("http-errors");
const { signVendorAccessToken } = require("../helpers/jwt_helpers");
const { verifyAccessToken } = require("../helpers/jwt_helpers");
const { signRefreshToken } = require("../helpers/jwt_helpers");
const cookieParser = require("cookie-parser");
const {cloudinary}=require('../cloudinary/cloudinary')
const asyncHandler = require("express-async-handler");

router.use(cookieParser());



module.exports={

    register: async (req, res, next) => {
        try {

            const Signupdata=req.body
            console.log({ Signupdata });
            const result = await signupSchema.validateAsync(req.body);
           
            const doesExist = await Vendor.findOne({ email: result.email });
            if (doesExist) {
                throw createError.Conflict(`${result.email} is already registered`);
            }

            const vendor = new Vendor(result);
            const savedVendor = await vendor.save();
            console.log({ savedVendor });
            const accessToken = await signVendorAccessToken(savedVendor.id, savedVendor.name, savedVendor.propic);

            return res.status(200).json({
                vendorAccessToken: accessToken,
                message: "Logged in successfully 😊 👌",
            });
        } catch (error) {
            console.log(error.message);
            res.json({error})
            if (error.isJoi === true) error.status = 422;
            // next(error);
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

            const vendorAccessToken = await signVendorAccessToken(vendor.id, vendor.name,vendor.propic);

            // const refreshToken = await signRefreshToken(user.id);

            console.log({ vendorAccessToken });

            // res.send({ accessToken, refreshToken });
            return res.status(200).json({
                vendorAccessToken: vendorAccessToken,
                message: "Logged in successfully 😊 👌",
            });
        } catch (error) {
            console.log(error);
            res.json({error})
            if (error.isJoi === true)
                return next(createError.BadRequest("invalid username/password"));

            next(error);
        }
    },



    proPicUpload: async (req, res, next) => {
        try {

            const vendorId=req.body.vendorId

            console.log({ vendorId});

            const imgStr = req.body.base64Img;

            const uploadResponse = await cloudinary.uploader.upload(imgStr,{

             upload_preset:'Vendor_propics',

             allowedFormats: ["jpg", "png","jpeg"]

            })           
            console.log(uploadResponse);

            const imgUrl= uploadResponse.url

            console.log({imgUrl});  

            const updateResp = await Vendor.findByIdAndUpdate(vendorId, { propic: imgUrl })

            console.log({ updateResp });
            res.json({msg:"uploaded"})


            // const croppedimg = await cloudinary.url({PublicId},{ width: 400, height: 400,  crop: "limit" })
            // console.log(croppedimg);



        } catch (error) {

            console.log(error);
            next(error)

        }

    },




    productRegister: asyncHandler(async (req, res, next) => {


        try {
            


            const { address, productName, productDesc, rent, category, pincode, latitude, longitude, vendorId } = req.body;
            console.log({ productName });
            console.log({ productDesc });
            console.log({ rent });
            console.log({ category });
            console.log({ address });
            console.log({ pincode });
            console.log({ latitude });
            console.log({ longitude });
            console.log({ vendorId });

            // const result = await ProductSchema.validateAsync(req.body);

            // console.log(result);

            const NewProduct = new Product(req.body);

            console.log({ NewProduct });

            const savedProduct = await NewProduct.save();

            console.log({ savedProduct });

            res.status(200).json(NewProduct);



        } catch (error) {
            console.log(error);
            
        }

       
    }),


    getById: asyncHandler(async (req, res, next) => {

        const vendorId = req.query.vendorId;

        const vendor = await Vendor.findById(vendorId);

        res.status(200).json(vendor);
    }),


    


}
