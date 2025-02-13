import Bounty from "../models/bounty.model.js";

export const createBounty= async (req,res,next)=>{
    try {
        const {title,description,skillsRequired,rewardAmount,rewardType,deadline} =req.body;

        if (!title || !description || !skillsRequired?.length || !rewardAmount || !deadline) {
            const error = new Error("All fields are required, including skillsRequired.");
            error.statusCode = 400;
            throw error;
        }

        const newBounty= await Bounty.create({
            title,
            description,
            skillsRequired,
            rewardAmount,
            rewardType, // Optional, defaults to "Cash" if not provided
            deadline,
            compnay:req.company._id
        })

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