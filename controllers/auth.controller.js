 /**
 * I need to write the controller / logic to register a user
 * controller can manage both the client request and response by server help of req,res object
 */
const bcrypt = require("bcryptjs")
const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken")
const authConfig = require("../configs/auth.config");

 exports.signup = async (req, res)=>{
    /**
     * Logic to create the user
     */

    //1. Read the request body
    const request_body = req.body

    //2. Insert the data in the Users collection in MongoDB
    const userObj = {
        name : request_body.name,
        userId : request_body.userId,
        email : request_body.email,
        userType : request_body.userType,
        password : bcrypt.hashSync(request_body.password,8)
    }

    try{

        const user_created = await user_model.create(userObj)
        /**
         * Return this user
         */
    //3. Return the response back to the user

        const res_obj = {
            name : user_created.name,
            userId : user_created.userId,
            email : user_created.email,
            userType : user_created.userType,
            createdAt : user_created.createdAt,
            updatedAt : user_created.updateAt
        }
        res.status(201).send(res_obj)

    }catch(err){
        console.log("Error while registering the user", err)
        res.status(500).send({
            message : "Some error happened while registering the user"
        })
    }


}

 exports.signIn = async(req,res)=>{
    //check if id is present or not in db read the user id in body
  const user=await user_model.findOne({userId: req.body.userId})
  if(user == null){
    return res.status(400).send({
        message:"user id is not valid"
    })
  }
    //password is correct or not hear first parameter it encrypt the password and and second on check both passing in body and store in db password
const isPasswordValid = bcrypt.compareSync(req.body.password,user.password)
if(!isPasswordValid){
   return res.status(401).send({
        message:"wrong password pass"
    })
}
    //using jwt create access token time to leave expire in time //wht dato for like user id,secrete code// time like 2 miniute 120 second
    const token = jwt.sign({id:user.userId},authConfig.secrete,{expiresIn:220})
    res.status(200).send({
        name:user.name,
        userId:user.userId,
        email:user.email,
        userType:user.userType,
        accessToken:token
    })
 }
//  id:ram@1233 pass hulk12333