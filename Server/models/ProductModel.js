const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { string } = require("joi");



const ProductSchema = new Schema({


    productName: {
        type: String,
        required:[true,"Product Name is required"],
        lowercase: true,
        unique: true,
    },
    productDesc: {
        type: String,
        required: [true, "Product Description is required"],
    },
    category: {
        type: String,
        required: [true, "Product Category is required"],
    },

    latitude: {
        type: String,
        required: [true, "Product latitude is missing"],
    },

    longitude: {
        type: String,
        required: [true, "Product longitude is missing"],
    },


    address: {
        type: String,
        required:[true, "Product address is required"],
    },

    vendorId: {
        type: String,
        required: [true, " vendorId is required"],
    },

    productpic: {

        type: String,
        
        default: "https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png?20170128014309"

    },
},
    {
        timestamps: true
    }
);


const Product = mongoose.model("product", ProductSchema);
module.exports = Product;
