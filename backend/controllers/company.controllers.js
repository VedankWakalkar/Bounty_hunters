import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import Company from "../models/company.model.js";

export const companySignUp= async(req,res,next)=>{
    const session=mongoose.startSession();
    (await session).startTransaction;
    try{
        const {name,description,website,email,password}=req.body;

        const existingCompany= await Company.find(email);
        if(existingCompany){
            const error= new Error("Company Already exist.")
            throw error;
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        
        const newCompany = await Company.create([{
            ...req.body,
            password:hashedPassword
        }],{session});
    
        const token = jwt.sign({companyId:newCompany[0]._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});

        (await session).commitTransaction;
        (await session).endSession;

        res
        .status(200)
        .json({
            success:true,
            data:{
                token,
                company:newCompany[0]
            }
        })
    }catch(error){
        (await session).abortTransaction;
        (await session).endSession;
        next(error)
    }
}

export const companySignIn= async(req,res,next)=>{  
    try {  
        const {email,password} =req.body;
        const company= await Company.find(email);
        if(!company){
            const error= new Error("Company not found.");
            error.statusCode=404;
            throw error;
        }
        const isPasswordValid= await bcrypt.compare(company.password,password);
        if(!isPasswordValid){
            const error =new Error("Password is invalid");
            error.statusCode=401;
            throw error;
        }
        const token= jwt.sign({companyId:company._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});

        res
        .status(200)
        .json({
            success:true,
            message:"Company Signed Up",
            data:{
                token,
                company:company
            }
        })
    } catch (error) {
        next(error);
    }
}

export const companySignOut= async(req,res,next)=>{
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
            message:"Company Signed Out."
        })
    }catch(error){
        next(error)
    }
}

