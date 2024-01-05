const mongoose = require("mongoose");
require("dotenv").config()
const DataBase = async () => {
    await mongoose.connect("mongodb+srv://prashant:prashantxyz@cluster0.yck3mc0.mongodb.net/noteApi?retryWrites=true&w=majority")
    console.log("connected to DataBase");
}
  
  
  module.exports={DataBase}