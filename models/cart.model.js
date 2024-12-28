const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products:{
        type:[String],
        default:[]
    },
    totalCost:{
        type:Number,
        default:0
    }
},{timestamps:true,versionKey:false});
module.exports = mongoose.model("cart",cartSchema)