import mongoose from "mongoose";
import Bounty from "../models/bounty.model.js";
import Company from "../models/company.model.js";


// done tested createBounty Endpoint 
export const createBounty= async (req,res,next)=>{
    
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const {title,description,skillsRequired,rewardAmount,rewardType,deadline} =req.body;

        if (!title || !description || !skillsRequired?.length || !rewardAmount || !deadline) {
            const error = new Error("All fields are required, including skillsRequired.");
            error.statusCode = 400;
            throw error;
        }
        if (!req.company || !req.company._id) {
            throw new Error("Company ID is missing in request.");
        }
        const companyId= req.company._id;
        console.log("companyId: ",companyId)
        const newBounty = await Bounty.create([{
            title,
            description,
            skillsRequired,
            rewardAmount,
            rewardType, // Optional, defaults to "Cash" if not provided
            deadline,
            company: companyId
        }], { session });

        // Update the company's postedBounties array
        await Company.findByIdAndUpdate(
            companyId,
            { $push: { postedBounty: newBounty[0]._id } }, // ✅ Push new bounty ID
            { session, new: true }
        );
        await session.commitTransaction();
        session.endSession()

        res
        .status(201)
        .json({
            success:true,
            message:"New Bounty Created Successfully",
            data:{
                bounty:newBounty
            }
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const getAllBounties =async (req,res,next)=>{
    try {
        const bounties=await Bounty.find();
        res
        .status(200)
        .json({
            success:true,
            message:"Bounties",
            data:{
                bounty:bounties
            }
        })
    } catch (error) {
        next(error)
    }
}

export const getBountyById = async (req,res,next)=>{
    try{
        const bountyId= req.params.id;
        const bounty= await Bounty.findById(bountyId);

        if(!bounty){
            const error = new Error("Bounty not found.");
            error.statusCode=404;
            throw error;
        } 
        res
        .status(200)
        .json({
            success:true,
            message:"Specific Bounty",
            data:{
                bounty:bounty
            }
        })
    }catch(error){
        next(error);
    }
}

export const updateBountyById = async (req,res,next)=>{
    try {
        const compnayId= req.company._id;
        const bountyId= req.params.id;

        const bounty= await Bounty.findById(bountyId);
        if(!bounty){
            const error = new Error ("Bount not found");
            error.statusCode=404;
            throw error;
        }

        if(bounty.company.toString()!==compnayId.toString()){
            const error = new Error ("Unauthorized Action");
            error.statusCode=403;
            throw error;
        }
        const updatedBounty = await Bounty.findByIdAndUpdate(bountyId, req.body, { new: true });
        res
        .status(201)
        .json({
            success:true,
            message:"Successfully Updated Bounty",
            data:{
                bounty:updatedBounty
            }
        })
    } catch (error) {
        next(error);
    }
}

export const deleteBountyById = async (req,res,next)=>{
    try {
        const companyId=req.company._id;
        const bountyId= req.params.id;

        const bounty= await Bounty.findById(bountyId);
        if(!bounty){
            const error = new Error ("Bounty not found.")
            error.statusCode=404;
            throw error;
        }

        if(bounty.company.toString()!==companyId.toString()){
            const error = new Error("Unathorized Access");
            error.statusCode= 401;
            throw error;
        }
        await Bounty.findByIdAndDelete()
        res
        .status(201)
        .json({
            success:true,
            message :"Bounty Deleted Successfully."
        })
    } catch (error) {
        next(error)
    }
}