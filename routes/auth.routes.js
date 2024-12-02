/**
 * post localhost:/8888/ecomm/api/v1/auth/signup
 */
const authController = require("../controllers/auth.controller")
const authMw = require("../middlewares/auth.mw")
module.exports = (app)=>{
    //the middleware always for of array
    app.post("/ecomm/api/v1/auth/signup",[authMw.verifySignupBody],authController.signup)

    // app.post("/ecomm/api/v1/auth/signin",authController.signIn)
    app.post("/ecomm/api/v1/auth/signin",[authMw.verifySignInBody], authController.signIn);

}