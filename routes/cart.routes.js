const auth_mw = require("../middlewares/auth.mw");
const cart_controller = require("../controllers/cart.controller");
const product_mw = require("../middlewares/product.mw")
module.exports = (app)=>{
    app.post("/ecomm/api/v1/cart",[auth_mw.verifyToken],cart_controller.createCart);

    app.put("/ecomm/api/v1/cart/:id",[auth_mw.verifyToken],cart_controller.AddCartData)
}

 