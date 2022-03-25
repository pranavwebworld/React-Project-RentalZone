const joi = require("joi")


const signupSchema = joi.object({

    email: joi.string().email().lowercase().required(),
    password: joi.string().min(2).required(),
    mobile: joi.string().length(10).required(),
    name: joi.string().required()

})

const loginSchema = joi.object({

    email: joi.string().email().lowercase().required(),
    password: joi.string().min(2).required(),
  
})


const ProductSchema = joi.object({

    address: joi.string().min(2).required(),

    productName: joi. string().min(2).required(),

    productDesc: joi.string().min(2).required(),

    rent: joi.required(),

    category: joi.string().min(2).required(),


    pincode: joi.number().min(6).required(),

    latitude: joi.required(),

    longitude: joi.required(),

    vendorId: joi.required()



})




module.exports = {
    signupSchema, loginSchema,ProductSchema


}