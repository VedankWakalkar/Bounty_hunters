import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import User from "../models/user.model.js";
import { JWT_SECRET,JWT_EXPIRES_IN } from "../config/env.js";

// Tested the Sign In,OUT,UP endpoints

export const signUp= async(req,res,next)=>{
    const session =await mongoose.startSession();
    
    try{
        session.startTransaction()
        const {username , email , password }=req.body;
    
        const existingUser = await User.findOne({
            email
        }).session(session);
        if(existingUser){
            const error=new Error("User Already Exist");
            error.statusCode=404;
            throw error;
        }

        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);

        const newUser= await User.create([{
            ...req.body,
            password:hashedPassword
        }],{session});
        
        const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        await session.commitTransaction();
        await session.endSession();

        res
        .status(201)
        .json({
            success:true,
            message:"User Created Successfully",
            data:{
                token,
                user:newUser[0]
            }
        })
    }catch(error){
        await session.abortTransaction();
        await session.endSession();
        next(error)
    }
}

export const signIn = async( req, res, next)=>{
    try{
        const {email,password}=req.body;
        const user = await User.findOne({
            email
        })
        if(!user){
            const error = new Error("User not found");
            error.statusCode=404;
            throw error;
        }

        const isPasswordValid= await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            const error= new Error("Password is not correct . Invalid Password")
            error.statusCode=401;
            throw error;
        }
        const token= jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});
        res
        .status(200)
        .json({
            success:true,
            message:"User Signed In Successfuly",
            data:{
                token,
                user:user
            }
        })
    }catch(error){
        next(error)
    }
}

export const signOut = async (req, res, next)=>{
    try{
        const token = req.cookies.authToken || req.headers.authorization?.split(" ")[1];

        if (!token) {
            const error = new Error("Cookie is not provided");
            error.statusCode = 401;
            throw error;
        }

        // Clear the cookie properly
        res
        .clearCookie("authToken", { httpOnly: true, secure: true, sameSite: "strict" })
        .status(200)
        .json({
            success: true,
            message: "User Signed Out."
        })
    }catch(error){
        next(error)
    }
}           