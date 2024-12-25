 const category_model = require("../models/category.model")
/*
controller for creating the category post call
POST  localhost:8080/ecomm/api/v1/category
{
"name":"mouse",
"description":"black wirless mouse"
}
*/  
exports.createNewCategory=async(req,res)=>{
  //read the body
  //create the category
  const category_data={
    name:req.body.name,
    description:req.body.description
  }
  //insert into monbodb(require model insert data in model )
  try{
    const category = await category_model.create(category_data)
    return res.status(200).send(category)
  }
  catch(err){
    console.log("error while creating category")
    res.status(500).send({
        message:"error while creating category"
    })
  }
 
  //return responce of created category
}
//controller for the list of category
exports.showAllCategory=async(req,res)=>{
  try{
    //step:1 fetch all the category
    const category = await category_model.find();
     //step2: now return the user to response back
     res.status(200).send({
      success:true,
      send:category
     })
  }
  catch(err){
    console.log("error.. while reading the category")
    res.status(500).send({
      success:false,
      message:"error not showing all category"
    })
  }
}