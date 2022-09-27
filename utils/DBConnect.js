const mongoose = require("mongoose");
require("dotenv").config();
const DBConnect = () =>{
    mongoose.connect(process.env.DATABASE)
        .then(()=>{
            console.log("Database connected");
        })
}
module.exports = DBConnect;
