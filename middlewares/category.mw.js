const category_model = require("../models/category.model");

const verifyCategoryBody = async (req,res,next)=>{
    try{
        if(!req.body.name){
           return res.status(402).send({
                message:"the category name does not provide"
            })
        }
        if(!req.body.description){
            return res.status(402).send({
                message:"the category description does not provide"
            })
        }
        next()
    }
    catch(err){
        return res.status(400).send({
            message:"some thing wrong in verify category body"
        })
    }
}
module.exports ={
    verifyCategoryBody:verifyCategoryBody
}