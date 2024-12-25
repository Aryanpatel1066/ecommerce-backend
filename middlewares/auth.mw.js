const user_model = require("../models/user.model");
const jwt = require("jsonwebtoken");
const auth_config = require("../configs/auth.config");
//signup body code 
const verifySignupBody = async(req,res,next)=>{
    try{
      //check for the name ,email,userId,same userId present

      if(!req.body.name){
        return res.status(400).send({
            message:"name was not provided in request body"
        })
      }
      //check for the email
      if(!req.body.email){
        return res.status(400).send({
            message:"email was not provided in request body"
        })
      }
      //user id check
      if(!req.body.userId){
        return res.status(400).send({
            message:"userId was not provided in request body"
        })
      }
      //check if same userId
      const user = await user_model.findOne({userId:req.body.userId});
      if(user){
        return res.status(400).send({
            message:"faied userid allredy present"
        })
      }
       
      next()
    }
    catch(err){
        console.log("error while validating request object",err);
        res.status(500).send({
            msg:"error while validating the request body"
        })
    }
}
//signIn body code
const verifySignInBody = async(req,res,next)=>{
  try{
   if(!req.body.password){
    return res.status(400).send({
      message:"password does not provided"
    })
   }
   else if(!req.body.userId){
    return res.status(400).send({
      message:"user id is not provided"
    })
   }
   next()
  }
  catch(err){
    console.log(err)
  }
}
const verifyToken = async (req, res, next) => {
  try {
    // Step 1: Check if the token is present in the header
    const token = req.header("access-token-key");
    if (!token) {
      return res.status(401).send({
        message: "Unauthorized: No token found",
      });
    }

    // Step 2: Verify the token
    jwt.verify(token, auth_config.secrete, async (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized: Invalid token",
        });
      }

      // Step 3: Fetch the user from the database using the decoded token's ID
      const user = await user_model.findOne({ userId: decoded.id });
      if (!user) {
        return res.status(401).send({
          message: "Unauthorized: No user found for this token",
        });
      }

      // Step 4: Attach user information to the request object
      req.user = user;
      next(); // Proceed to the next middleware or route handler
    });
  } catch (error) {
    console.error("Error in verifyToken middleware:", error);
    res.status(500).send({
      message: "Internal server error in token verification",
    });
  }
};

const isAdmin = (req, res, next) => {
  try {
    const user = req.user;
    if (user && user.userType === "ADMIN") {
      next(); // User is an admin, proceed to the next middleware or route handler
    } else {
      return res.status(403).send({
        message: "Forbidden: Only admin users are allowed to access this endpoint",
      });
    }
  } catch (error) {
    console.error("Error in isAdmin middleware:", error);
    res.status(500).send({
      message: "Internal server error in admin authorization",
    });
  }
};

 
module.exports={
    verifySignupBody : verifySignupBody,
    verifySignInBody :verifySignInBody,
    verifyToken : verifyToken,
    isAdmin:isAdmin
}
 
