 // Starting file of project
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const app = express();
const server_config = require('./configs/server.config');
const db_config = require('./configs/db.config');
const user_modal = require('./models/user.model');
//convert json into javascript object
app.use(express.json())
/**
 * Connect to MongoDB
 */
mongoose.connect(db_config.DB_URL);
const db = mongoose.connection;

db.on("error", () => {
    console.log("Error connecting to the MongoDB database");
});

db.once("open", () => {
    console.log("Connected to the MongoDB database");
    init(); // Initialize admin user
});

/**
 * Create an admin user if not already present
 */
async function init() {
    try {
        // Check if admin user exists
        const adminUser = await user_modal.findOne({ userId: "admin" });
        if (adminUser) {
            console.log("Admin user is already present");
            return;
        }

        // Create admin user
        const newUser = await user_modal.create({
            name: "Aryan",
            userId: "admin", // userId for admin user
            email: "aryanpatel1248@gmail.com",
            userType: "ADMIN", // Role of the user
            password: bcrypt.hashSync("welcome1", 8), // Hashed password
        });

        console.log("Admin user created successfully:", newUser);
    } catch (err) {
        console.error("Error during admin initialization:", err);
    }
}
// call the route to the server and pass to app object
require("./routes/auth.routes")(app)
require("./routes/category.routes")(app)
/**
 * Start the server
 */
app.listen(server_config.PORT, () => {
    console.log("Server started at port number:", server_config.PORT);
});
