const JWT = require("jsonwebtoken");
const createErrors = require("http-errors");
const { options } = require("../app");

module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                name: "pranav",
               
            };
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn:'1h',
                issuer:'RentalZone.com',
                audience:userId,
            };

            JWT.sign(payload, secret, options, (err, token) => {

                if (err) 
                {   

                    console.log(err.message);
                    reject(createErrors.InternalServerError());

                }
                resolve(token);
            });
        });
    },
};
