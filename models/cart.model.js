const mongoose = require("mongoose");

// Define a schema for products within the cart
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
});

// Define the cart schema
const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true, // userId is required
        },
        products: {
            type: [productSchema], // Store an array of product objects
            default: [],
        },
        totalCost: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Cart", cartSchema);
