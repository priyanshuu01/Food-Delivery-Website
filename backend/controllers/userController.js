import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// login user
const loginuser = async(req,res) =>{
    const {email,password} = req.body;
    try{
      const user =await userModel.findOne({email})
      if(!user){
         return res.json({success:false,message:"user Doesn't exist"})
      }
      const isMatch = await bcrypt.compare(password,user.password)

      if(!isMatch){
         return res.json({success:false, message:"Invalid credentials"})
      }

      const token = createToken(user._id, user.isAdmin);
      res.json({success:true,token, isAdmin: user.isAdmin})

    }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"})
    }
}

const createToken =(id, isAdmin)=>{
    return jwt.sign({id, isAdmin},process.env.JWT_SECRET)
}

// register user
const registeruser = async(req,res) =>{
   const {name,password,email} = req.body;
   try{
    //checking is user already exists
    const exists = await userModel.findOne({email})
    if(exists){
        return res.json({success:false , message:"User already exists"})
    }

     // validating email & strong password
     if(!validator.isEmail(email)){
       return res.json({success:false,message:"Please enter a vald email"})
     }

     if(password.length<8){
        return res.json({success:false,messgae:"Please enter a strong password"})
     }

     // hashing user password
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password,salt)

     const newUser = new userModel({
        name:name,
        email:email,
        password:hashedPassword,
        isAdmin: false // By default, not admin
     })

     const user = await newUser.save()
     const token = createToken(user._id, user.isAdmin)
    res.json({success:true,token, isAdmin: user.isAdmin})
   } 
  
   catch(error){
    console.log(error);
    res.json({success:false , message:"Error"})
   }
}

export {loginuser , registeruser}