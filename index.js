/* const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
//require("dotenv").config();

const app = express();

app.use(express.json())

app.use(cors({
    origin:"*"
}))


const User=require('./models/userModel');

 mongoose.connect('mongodb+srv://pmahesh493605:1FuJDyTqLg0xzo6x@cluster0.mhd5a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("Mongodb Connected...")).catch((error)=>console.error("Failed to Connect to MongoDb"));
 


app.get("/", (req, res) => {
    console.log("GET request received at /");
    res.send("Hello, welcome to authentication login and signup pages");
});

app.post("/users/",async (req,res)=>{
    const {name,email,password}=req.body;
    try {
        if(!name){
            return res.status(400).json({error:true, message:"Name is Required"});
        }
    
        if(!email){
            return res.status(400).json({error:true, message:"Email is Required"});
        }
    
        if(!password){
            return res.status(400).json({error:true, message:"Password is Required"});
        }
    
        const isUserExist = await User.findOne({email:email});
    
        if(isUserExist){
            return res.status(400).json({error:true, message:"User Already Exists"});
        }
            const hashedPassword = await bcrypt.hash(password,10);
            const user=await User({
                name,
                email,
                password:hashedPassword,
            })
            await user.save(); 
            res.status(200).json({ error: false, message: "User created successfully." });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:true, message:"Internal Server Error",error});
    }

   
});

app.post('/login/',async(req,res)=>{
    const {email,password}=req.body;

    if(!email){
        return res.status(400).json({error:true, message:"Email is Required"});
    }

    if(!password){
        return res.status(400).json({error:true, message:"Password is Required"});
    }

    const userInfo=await User.findOne({email:email});

    if(!userInfo){
        return res.status(400).json({error:true, message:"Invalid USer"});
    }else{
        const isPasswordMatched=await bcrypt.compare(password,userInfo.password);
        if(isPasswordMatched===true){
            const payload={email:email};
            const jwtSecret= "default_secret"
            const jwtToken=jwt.sign(payload, jwtSecret);
            res.status(200).json({ error: false,email, jwtToken,message:"Login Successful" });

        }else{
            res.status(400).json({error:true,message:"Invalid Password"});
        }
        
    }
})


const PORT =  4005;

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
})

module.exports=app; */

const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
//require("dotenv").config();

const app = express();

app.use(express.json())

app.use(cors({
    origin:"*"
}))


const User=require("./models/user.model")

mongoose.connect('mongodb+srv://pmahesh493605:1FuJDyTqLg0xzo6x@cluster0.mhd5a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("Mongodb Connected...")).catch((error)=>console.error("Failed to Connect to MongoDb"));
 

/* const authenticateToken = (request, response, next) => {
    let jwtToken;
    const authHeader = request.headers["authorization"];
    if (authHeader !== undefined) {
      jwtToken = authHeader.split(" ")[1];
    }
    if (jwtToken === undefined) {
      response.status(401);
      response.send("Invalid JWT Token");
    } else {
      jwt.verify(jwtToken,'MY_SECRETE_TOKEN', async (error, user) => {
        if (error) {
          response.status(401);
          response.send("Invalid JWT Token");
        } else {
          request.user = user;
          next();
        }
      });
    }
  }; */


app.get("/",(request,response)=>{
    response.send({data:"hello"});
})

//Create Account
app.post("/create-account",async(request,response)=>{
    const {name,emailInput,passwordInput}=request.body
    try{
        if(!name){
            return response.status(400).json({error:true, message:"Full name is Required"});
        }
    
        if(!emailInput){
            return response.status(400).json({error:true, message:"Email is Required"});
        }
    
        if(!passwordInput){
            return response.status(400).json({error:true, message:"Password is Required"});
        }
    
        const isUser=await User.findOne({emailInput:emailInput})
        
        if(isUser){
             response.json({error:true,message:"User Already Exist!!!"});
        }
        else{
            /* const user=new User({
                name,
                emailInput,
                passwordInput,
            });
            await user.save() */
    
            const hashedPassword = await bcrypt.hash(passwordInput,10);
            const user=await User({
                name,
                emailInput,
                passwordInput:hashedPassword,
            })
            await user.save()
    
           /*  const accessToken=jwt.sign({user},"MY_SECRETE_TOKEN",{expiresIn:"36000m"})
            response.json({
                error:false,
                user,
                accessToken,
                message:"Registration Successful!!!",
            }) */
            response.status(200).json({ error: false, user,message: "User created successfully." });
          
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:true, message:"Internal Server Error",error});
    }

    
})

//Create Login 
app.post('/login',async (request,response)=>{
    const {emailInput,passwordInput}=request.body
    try {
        if(!emailInput){
            return response.status(400).json({message:"Email is Required"});
        }
    
        if(!passwordInput){
            return response.status(400).json({message:"Password is Required"});
        }
    
        const userInfo=await User.findOne({emailInput:emailInput})
    
        if(!userInfo){
            response.status(400).json({error:true,message:"User Not Found or Invalid User"});
        }
        else{
            /* if(userInfo.emailInput===emailInput && userInfo.passwordInput===passwordInput){
                const user={user:userInfo};
                const accessToken=jwt.sign(user,"MY_SECRETE_TOKEN",{expiresIn:"36000m"});
                response.json({
                    error:false,
                    emailInput,
                    accessToken,
                    message:"Login Successful!!!",
                })
            }else{
                response.status(400).json({
                    error:true,
                    message:"Invalid Credentials"
                })
            } */
    
            const isPasswordMatched = await bcrypt.compare(passwordInput,userInfo.passwordInput);
            if(userInfo.emailInput===emailInput && isPasswordMatched){
                const payload={emailInput:emailInput};
                const jwtSecret= "default_secret"
                const jwtToken=jwt.sign(payload, jwtSecret);
                response.status(200).json({ error: false,email, jwtToken,message:"Login Successful" });  
            }
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:true, message:"Internal Server Error",error});
    }

    
})

const PORT = process.env.PORT || 4005
app.listen(PORT,()=>{
    console.log(`server is Running at port ${PORT}`);
})

module.exports=app;