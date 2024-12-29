const Cart = require("../models/cart.model");

exports.createCart = async (req, res) => {
    try {
        // Assuming userId is available in the authenticated user's token or middleware
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).send({
                message: "User ID is required",
            });
        }

        // Check if a cart already exists for the user
        const existingCart = await Cart.findOne({ userId });

        if (existingCart) {
            return res.status(400).send({
                message: "User already has a cart",
            });
        }

        // Create a new cart with the userId
        const newCart = await Cart.create({ userId });

        res.status(201).send({
            message: "Cart created successfully",
            cart: newCart,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: "Error while creating the cart",
        });
    }
};

exports.AddCartData = async (req, res) => {
    try {
        const { id: cartId } = req.params; // Extract cart ID from URL
        const { products } = req.body; // Extract products array from request body

        if (!cartId) {
            return res.status(400).send({
                message: "Cart ID is required in the URL",
            });
        }

        if (!products || !Array.isArray(products)) {
            return res.status(400).send({
                message: "Products must be an array in the request body",
            });
        }

        // Find the cart by ID
        const cart = await Cart.findById(cartId);

        if (!cart) {
            return res.status(404).send({
                message: "Cart not found",
            });
        }

        // Validate and normalize products
        const newProducts = products.map((product) => {
            if (!product.name || !product.price || !product.quantity) {
                throw new Error(
                    "Each product must include 'name', 'price', and 'quantity'"
                );
            }
            return {
                ...product,
                totalPrice: product.price * product.quantity,
            };
        });

        // Add new products to the existing array
        cart.products = [...cart.products, ...newProducts];

        // Update the cart's total cost
        cart.totalCost = cart.products.reduce(
            (total, product) => total + product.totalPrice,
            0
        );

        // Save the updated cart
        const updatedCart = await cart.save();

        res.status(200).send({
            message: "Cart updated successfully",
            cart: updatedCart,
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Failed to update the cart",
        });
    }
};
