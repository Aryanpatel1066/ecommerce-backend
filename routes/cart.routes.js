const auth_mw = require("../middlewares/auth.mw");
const cart_controller = require("../controllers/cart.controller")
module.exports = (app)=>{
    app.post("/ecomm/api/v1/cart",[auth_mw.verifyToken],cart_controller.createCart);
}