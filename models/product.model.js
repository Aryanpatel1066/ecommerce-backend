const mongoose = require("mongoose")

/**
 * productName
 * productPrice
 * productDescription
 * category
 */

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
        minlength:10
    },
    category:{
        type:String,
        required:true,
     }
},{timestamps:true,versionKey:false})

//create product model
module.exports = mongoose.model("product",productSchema)