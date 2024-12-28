const product_controller = require("../controllers/product.controller")
const auth_mw = require("../middlewares/auth.mw");
const product_mw = require("../middlewares/product.mw")
module.exports = (app)=>{
    //api for creating product
app.post("/ecomm/api/v1/product",[auth_mw.verifyToken,auth_mw.isAdmin,product_mw.verifyProductBody],product_controller.products)

//api for showing all product
app.get("/ecomm/api/v1/product",product_controller.showingAllProducts)

//api for search the product

app.get("/ecomm/api/v1/product/search",product_controller.searchProductByName)

//api for the update the product by admin

app.put("/ecomm/api/v1/product/:id",[auth_mw.verifyToken,auth_mw.isAdmin,product_mw.verifyProductBody],product_controller.updatedProduct)
}