const mongoose = require("mongoose");
require("dotenv").config();
const DBConnect = () =>{
    mongoose.connect(`mongodb+srv://acc-a2:${process.env.DATABASE}@cluster0.worr8fb.mongodb.net/?retryWrites=true&w=majority`)
        .then(()=>{
            console.log("Database connected");
        })
}
module.exports = DBConnect;
// 5Zryt1SfjvAcVTKe