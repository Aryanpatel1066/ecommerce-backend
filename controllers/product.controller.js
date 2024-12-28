const product_model = require("../models/product.model");

//logic to create the product by admin

exports.products = async (req,res)=>{
    try{
        const request_body = req.body;
     const productsData={
        name:request_body.name,
        price:request_body.price,
        description:request_body.description,
        category:request_body.category
     }
     const product_created = await product_model.create(productsData);

     //now product created now return response
     res.status(201).send({
        message:"successfully created the product",
        product :product_created
     })
    }
    catch(err){
        return res.status(500).send({
            message:"some thing wrong when creating category"
        })
    }
}
exports.showingAllProducts =async(req,res)=>{
    try{
    const allProduct = await product_model.find();
    return res.status(200).send({
        message:"showing all products",
        send:allProduct
    })
    }
    catch(err){
        console.log(err);
        return res.status(502).send({
            message:"something wrong while showing all products"
        })
    }
}
//controller for the search product by name
exports.searchProductByName = async (req,res)=>{
    try{
        //extract the "name" from the query parameter
       const {name} = req.query;
       if(!name){
        return res.status(500).send({
            message:"please! provide the name to search"
        })
       }
       const matchingProduct = await product_model.find({name:{$regex:name,$options:"i"}});
//simple way 
// const matchingProduct = await product_model.find({name})
       if(!matchingProduct){
        return res.status(502).send({
            message:"not found any product"
        })
       }
       return res.status(200).send({
        message: "Products found",
        products: matchingProduct
    });
    }
    catch(err){
        return res.status(504).send({
            message:"something went wrong when search product by name"
        })
    }
}

//controller for the update the product details

exports.updatedProduct = async (req,res)=>{
    try{
        //step1: fetch the id form url and second thing is read the body details
     const {id} = req.params;
     const {name,price,details,description,category}=req.body;

     //step2: update the product in db
     const updated_product = await product_model.findByIdAndUpdate(id,{name,price,description,category},{new:true});

     if(!updated_product){
        return res.status(504).send({
            message:"some thing happened can't update the category"
        })
     }
     res.status(200).send({
        message:"successfully updated the product...",
        product :updated_product
     })
    }
    catch(err){
        return res.status(500).send({
            message:"error happened while update the product"
        })
    }
}

//controller for the delet the product

exports.deletedProduct = async (req,res)=>{
    try{
//step1: read the id from url
const {id}=req.params;

//step2:delete the product and update the db

const deleted_product = await product_model.findByIdAndDelete(id)
//step3: if delte the product then success or err
if(!deleted_product){
    return res.status(404).send({
        message:"this product does not exist"
    })
}
return res.status(200).send({
    message:"successfully deleted product"
})
    }
    catch(err){
       return res.status(502).send({
        message:"error happende while the delete product"
       })
    }
}