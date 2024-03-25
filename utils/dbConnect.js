const mongoose = require("mongoose");

// Database connection
module.exports.dbConnect = async() => {
    try {
        await mongoose.connect(process.env.DATABASE);   
        console.log("database connected")
    } catch (error) {
        console.log(error.message);
    }
}