const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, unique:true, required:true},
    password:{type:String, required:true},
    createdOn:{type:Date,default:new Date().getTime()},
}) 

module.exports = mongoose.model("User",userSchema);