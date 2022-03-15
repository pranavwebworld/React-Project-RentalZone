const JWT = require("jsonwebtoken");
const createErrors = require("http-errors");
const { options } = require("../app");


module.exports = {
  signAccessToken: (userId,user) => {

    return new Promise((resolve, reject) => {
      const payload = {
        name :user,
      };
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "1y",
        issuer: "RentalZone.com",
        audience: userId,
      };

      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createErrors.InternalServerError());
        }
        resolve(token);
      });
    });
  },


  verifyAccessToken: (req, res, next) => {

      const token = req.cookies.userAccessToken

      console.log({token});
      // if (!req.cookies.userAccessToken) return next(createErrors.Unauthorized());

    // const authHeader = req.headers["authorization"];
    // const bearerToken = authHeader.split(" ");
    // console.log(bearerToken);
    // const token = bearerToken[1];

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {


        // const message =
        //   err.name === "JasonWebTokenError" ? "Unauthorized" : err.message;

        // return next(createErrors.Unauthorized(message));

        return res.json({ payload })
      }
      req.payload = payload;
      res.json({ payload})
      next();
    });
  },

  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {
        name: "pranav",
      };
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: "1y",
        issuer: "RentalZone.com",
        audience: userId,
      };

      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createErrors.InternalServerError());
        }
        resolve(token);
      });
    });
  },


 
   
}
