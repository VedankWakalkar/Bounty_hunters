import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import Company from "../models/company.model.js";
import Submission from "../models/submission.model.js";

// Tested the Sign In,OUT,UP endpoints

export const companySignUp= async(req,res,next)=>{
    const session=await mongoose.startSession();
    
    try{
        session.startTransaction()
        const {name,description,website,email,password}=req.body;

        // const existingCompany= await Company.findOne({email}).session(session);
        const existingCompany = await Company.findOne({ email }).session(session);
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

        await session.commitTransaction();
        session.endSession();

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
        await session.abortTransaction();
        session.endSession();
        next(error)
    }
}

export const companySignIn= async(req,res,next)=>{  
    try {  
        const {email,password} =req.body;
        const company= await Company.findOne({email});
        if(!company){
            const error= new Error("Company not found.");
            error.statusCode=404;
            throw error;
        }
        const isPasswordValid= await bcrypt.compare(password,company.password);
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
        const token = req.cookies.authToken|| req.headers.authorization.split(" ")[1];
        if(!token){
            const error = new Error("Cookie is not provided");
            throw error
        }
        res
        .clearCookie("authToken",{ httpOnly: true, secure: true, sameSite: "strict" })
        .json({
            success:true,   
            message:"Company Signed Out."
        })
    }catch(error){
        next(error)
    }
}

export const getSubmissions= async(req,res,next)=>{
    try {
        const companyId= req.company._id;

        const submissions=await Submission.find()
        .populate({
            path:"bounty",
            match:{company:companyId},
            select:title
        })
        .populate(
            "user",
            "name email"
        )
        const filteredSubmissions = submissions.filter(sub => sub.bounty !== null);
        res
        .status(200)
        .json({
            success:true,
            data:{
                filteredSubmissions
            }
        })
    } catch (error) {
        next(error)
    }
}

export const updateSubmission = async (req,res,next)=>{
    try {
        const bountyId= req.params;
        const { status } =req.body;
        const compnayId = req.compnay._id;

        const submission= await Submission.findById(bountyId).populate("bounty");
        if(!submission){
            const error = new Error("Submission not found")
            error.statusCode=404;
            throw error;
        }

        if(submission.compnay.toString()!== compnayId.toString()){
            const error = new Error ("Unathorized Action");
            error.statusCode=403;
            throw error;
        }
        submission.status=status;
        await submission.save();
        res
        .status(200)
        .json({
            success:true,
            message:`Submission ${status} successfully`,
            data:{
                submission
            }
        })
    } catch (error) {
        next(error)
    }
}