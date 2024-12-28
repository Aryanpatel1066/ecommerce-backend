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