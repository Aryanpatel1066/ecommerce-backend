const verifyProductBody = async (req,res,next)=>{
    try{
      if(!req.body.name){
        return res.status(502).send({
            message:"The product name does not provide"
        })
      }
      if(!req.body.description){
        return res.status(502).send({
            message:"The product description does not provide"
        })
      }
      if(!req.body.price){
        return res.status(502).send({
            message:"The product price does not provide"
        })
      }
      if(!req.body.category){
        return res.status(502).send({
            message:"The product category does not provied"
        })
      }
      if(req.body.description.length < 10){
        return (res.status(502).send({
            message:"add more description of the product"
        }))
      }
      next()
    }
    catch(err){
        res.status(500).send({
            message:"something wrong"
        })
    }
}
module.exports={
    verifyProductBody:verifyProductBody
}