const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const { string } = require("joi");

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    propic:{

        type:string,
        required:true,
        default:"https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png?20170128014309"

    },
});


UserSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});


UserSchema.methods.isValidPassword = async function (password) {

    try {

        return await bcrypt.compare(password, this.password)


    } catch (error) {

        throw error

    }

}


const User = mongoose.model("user", UserSchema);
module.exports = User;
