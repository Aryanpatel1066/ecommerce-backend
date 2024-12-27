/**
 * 
 * POST  localhost:8080/ecomm/api/v1/categories
 */
const category_controller = require("../controllers/category.controller")
const auth_mw = require("../middlewares/auth.mw");
const category_auth = require("../middlewares/category.mw")
module.exports=(app)=>{
    //api for creating the categories
    app.post("/ecomm/api/v1/categories",[auth_mw.verifyToken,auth_mw.isAdmin],category_controller.createNewCategory);

   //api for showing all the categories
   app.get("/ecomm/api/v1/categories",category_controller.showAllCategory);

   //api for deleted categories
   app.delete("/ecomm/api/v1/categories/:id",[auth_mw.verifyToken,auth_mw.isAdmin],category_controller.deleteCategory);

   //api for the updated categories

   app.put("/ecomm/api/v1/categories/:id",[category_auth.verifyCategoryBody,auth_mw.verifyToken,auth_mw.isAdmin],category_controller.updateCategory)

}