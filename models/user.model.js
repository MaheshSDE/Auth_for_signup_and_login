const mongoose=require("mongoose");


const userSchema=new mongoose.Schema({
    name:{type:"string",required:true},
    emailInput:{type:"string",unique:true,required:true},
    passwordInput:{type:"string",required:true},
    createdOn:{type:Date,default:new Date().getTime()},
})

module.exports=mongoose.model("User",userSchema);