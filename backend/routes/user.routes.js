const express= require("express")
const userRouter= express.Router()
const zod=require('zod')
const User = require("../models/User")
const jwt= require("jsonwebtoken")
const { JWT_SECRET } = require("../config")


const userSignupSchema=zod.object({
    username:zod.string(),
    password:zod.string(),
    email:zod.string().email()
})

userRouter.post("/auth/signup",async (req,res)=>{
    const {success}=userSignupSchema.safeParse(req.body);
    console.log("Zod Validation Success:", success);
    if(!success){
        return res.status(411).json({
            message:"Invalid Inputs"
        })  
    }
    const existingUser = await User.findOne({
       username:req.body.username
    })
    if(existingUser){
        return res.status(411).json({
            message:"User already exists"
        })
    }
    const newUser= await User.create({
        username:req.body.username,
        password:req.body.password,
        email:req.body.email
    })
    const userId=User._id;
    const token=jwt.sign({
        userId
    },JWT_SECRET)
    
    res.json({
        message:"User Created Successfully",
        token:token
    })
})

module.exports=userRouter