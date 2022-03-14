const joi = require("joi")


const authSchema = joi.object({

    email: joi.string().email().lowercase().required(),
    password: joi.string().min(2).required(),
    mobile: joi.string().length(10).required(),
    name: joi.string().required()

})


module.exports = {
    authSchema


}