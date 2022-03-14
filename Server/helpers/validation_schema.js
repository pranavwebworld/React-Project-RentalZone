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


module.exports = {
    signupSchema, loginSchema


}