import mongoose from "mongoose"
import User from "../models/user.model";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/env";

export const signUp= async(req,res,next)=>{
    const session = mongoose.startSession();
    (await session).startTransaction;
    try{
        const {username , email , password }=req.body;
    
        const existingUser = await User.findOne({
            email
        })
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
        
        const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        (await session).commitTransaction;
        (await session).endSession;

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
        (await session).abortTransaction;
        (await session).endSession;
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
        const token = req.cookies.authToken;
        if(!token){
            const error = new Error("Cookie is not provided");
            throw error
        }
        res
        .clearCookie(authToken)
        .json({
            success:true,
            message:"User Signed Out."
        })
    }catch(error){
        next(error)
    }
}       