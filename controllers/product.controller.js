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