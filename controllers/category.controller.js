 const category_model = require("../models/category.model")
 const mongoose = require('mongoose')
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

exports.deleteCategory = async(req,res)=>{
  try{
  //step1: pass the id specific category in route to delete now fetch it
  const {id} = req.params;
   // Step 2: Validate the ID format
   if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "Invalid ID format",
    });
  }
  //step2: now delete it
  const deledCategory = await category_model.findByIdAndDelete(id);
  console.log(id)
  //step3: if not found id then or if found 
  if(!deledCategory){
    return res.status(404).send({
      message:"oops! category not found"
    })
  } 
  //successfully deleted category
  return res.status(200).send({
    message:"successfully deleted the category..."
  })
  }
  catch(err){
   console.log(err);
  return res.status(500).send({
    message:"some thing wrong can't delete the category"
   })
  }
}

//for the upadate the category
exports.updateCategory = async (req,res)=>{
  try{
    //step1:read the id for url
    const {id} = req.params;
    const {name,description}=req.body;

    //step2: update the category 
    const category =await category_model.findByIdAndUpdate(id,{name,description},{new:true});
   
  if(!category){
    return res.status(402).send({
      message:"sorry cant update the category"
    })
  }
     return res.status(200).send({
      message:`successfully updated the category `,
     updateCategory:category
    })
  
  }
  catch(err){
    return res.status(400).send({
      message:"the error happen while update the category"
    })
  }
}