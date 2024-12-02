// check the request body proper or not
const { response } = require("express")
const user_model = require("../models/user.model")
const verifySignupBody=async(req,res,next)=>{
    try{
      //chceck for name
      if(!req.body.name){
        return res.status(400).send({
            message:"faild name was not provided"
        })
      }
      //check for email
      if(!req.body.email){
        return res.status(400).send({
            message:"faild email was not provided"
        })
      }
      //check for the userid
      if(!req.body.userId){
        return res.status(400).send({
            message:"faild userId was not provided"
        })
      }
      //check if the user with the same userId is alredy present 
      const user = await user_model.findOne({userId:req.body.userId}) 
      if(user){
        return res.status(400).send({
            message:"failed user with same userid is allredy present"
        })
      }
      next()
    }
    catch(err){
        console.log("error while validatin",err)
        res.status(500).send({
            massage:"error wile vali dating body"
        })
    }
}

const verifySignInBody = async(req,res,next)=>{
  if(!req.body.userId){
    return res.status(400).send({
      message:"userId is not provided"
    })
  }
  else if(!req.body.password){
    return res.status(400).send({
      message:"password is not provided"
    })
  }
}
module.exports = {
    verifySignupBody : verifySignupBody,
    verifySignInBody : verifySignInBody
}