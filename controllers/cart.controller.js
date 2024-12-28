const cart_model = require("../models/cart.model")
//create the cart
exports.createCart =async (req,res)=>{
try{
const cart = await cart_model.create({});
res.status(201).send({
    message:"successfully create the cart",
    send:cart
})
}
catch(err){
    return res.status(504).send({
        message:"error while create the category"
    })
}
}