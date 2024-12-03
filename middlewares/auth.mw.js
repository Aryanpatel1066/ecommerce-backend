const jwt = require("jsonwebtoken");
const auth_config = require("../configs/auth.config");
const user_model = require("../models/user.model");

const verifySignupBody = async (req, res, next) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({ message: "Failed: Name was not provided" });
    }
    if (!req.body.email) {
      return res.status(400).send({ message: "Failed: Email was not provided" });
    }
    if (!req.body.userId) {
      return res.status(400).send({ message: "Failed: UserId was not provided" });
    }
    const user = await user_model.findOne({ userId: req.body.userId });
    if (user) {
      return res.status(400).send({ message: "Failed: User with same userId already exists" });
    }
    next();
  } catch (err) {
    console.error("Error while validating body:", err.message || err);
    return res.status(500).send({ message: "Error while validating body" });
  }
};

const verifySignInBody = async (req, res, next) => {
  if (!req.body.userId) {
    return res.status(400).send({ message: "userId is not provided" });
  } else if (!req.body.password) {
    return res.status(400).send({ message: "password is not provided" });
  }
  next();
};

const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization'] || req.headers['access-token'];
  if (!token) {
    return res.status(403).send({ message: "No token found. Unauthorized" });
  }
  jwt.verify(token, auth_config.secrete, async (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const user = await user_model.findOne({ userId: decoded.id });
    if (!user) {
      return res.status(400).send({ message: "Unauthorized. Token does not match any user" });
    }
    req.user = user; // Attach user for downstream usage
    next();
  });
};
const isAdmin = (req,res,next)=>{
  const user = req.user
  if(user && user.userType == "ADMIN"){
    next()
  }
  else{
    return res.status(403).send({
      message:"only admin access this end point"
    })
  }
}
module.exports = {
  verifySignupBody,
  verifySignInBody,
  verifyToken,
  isAdmin
};
