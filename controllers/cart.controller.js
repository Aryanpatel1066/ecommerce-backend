const cart_model = require("../models/cart.model");
const user_model = require("../models/user.model");

exports.createCart = async (req, res) => {
    try {
        // Step 1: Check if the user ID is provided or not
        const userId = req.user.id;
        if (!userId) {
            return res.status(502).send({
                message: "Please provide the userId"
            });
        }

        // Step 2: Check if a cart already exists for the user
        const existingCart = await cart_model.findOne({ userId: userId });

        if (existingCart) {
            return res.status(400).send({
                message: "User already has a cart"
            });
        }

        // Step 3: If no cart exists, create a new one
        const newCart = await cart_model.create({ userId: userId });

        res.status(201).send({
            message: "Successfully created the cart",
            cart: newCart
        });
    } catch (err) {
        console.error(err);
        return res.status(504).send({
            message: "Error while creating the cart"
        });
    }
};

exports.AddCartData = async (req,res)=>{
    try{
      //step1: pass the cart id in url and readit
      const {id:cartId} = req.params;
      //step2: pass the product array  in req body
      const {products} = req.body;

      if(!cartId){
        return res.status(504).send({
            message:"cart id require in url"
        })
      }
      // Step 3: Find the cart by ID
      const cart = await cart_model.findById(cartId);

      if (!cart) {
          return res.status(404).send({
              message: "Cart not found",
          });
      }
       // Step 4: Add new products to the existing array
       cart.products = [...cart.products, ...products];

        // Step 6: Save the updated cart
        const updatedCart = await cart.save();

        // Step 7: Send success response
        res.status(200).send({
            message: "Cart updated successfully",
            cart: updatedCart,
        });
    }
    catch(err){
        return res.status(404).send({
            message:"This cart does not update"
        })
    }
}