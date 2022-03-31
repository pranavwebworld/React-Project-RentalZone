const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { string, number } = require("joi");




const OrderSchema = new Schema({

    product: {
        type: Object,
        required: [true, "Productis required"],
       
    },

    userId: {
        type: String,
        required: [true, " vendorId is required"],
    },

    total: {
        type: Number,
        required: [true, " vendorId is required"],
    },

    Days: {
        type: Number,
        required: [true, " vendorId is required"],
    },

    startingDate: {

        type: Date,

    },
    endingDate: {

        type: Date,

    },
    
},
    {
        timestamps: true
    }
);






const Order = mongoose.model("order", OrderSchema );
module.exports = Order;
