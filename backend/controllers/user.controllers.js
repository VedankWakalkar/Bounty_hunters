import Bounty from "../models/bounty.model.js";
import Submission from "../models/submission.model.js";
import User from "../models/user.model.js";

export const getUsers=async(req,res,next)=>{
    try{
        const users=await User.find();
        res
        .status(200)
        .json({
            success:true,
            data:{
                users
            }
        })
    }catch(error){
        next(error);
    }
}

export const getUser=async(req,res,next)=>{
    try {
        const id=req.params.id;
        const user = await User.findById(id);
        if(!user){
            const error=new Error("User not Exist.")
            error.statusCode=404;
            throw error;
        }
        res
        .status(200)
        .json({
            success:true,
            data:{
                user
            }
        })
    } catch (error) {
        next(error);
    }
}

export const createSubmission =async (req,res,next)=>{
    try {
        const { bounty , reportDetails , proof }= req.body;
        const userId = req.user._id;

        const bountyExist= await Bounty.findById(bounty);
        if(!bountyExist){
            const error = new Error ("Bounty not Found.")
            error.statusCode=404
            throw error
        }
        const newSubmission= await Submission.create({
            bounty,
            user:userId,
            reportDetails,
            proof
        })
        res
        .status(200)
        .json({
            success:true,
            message:"Created Submission Successfully",
            data:{
                Submission:newSubmission
            }
        })

    } catch (error) {
        next(error)
    }
}

export const getSubmissions= async (req,res,next)=>{
    try {
        const userId = req.user._id;
        
        const submission= await Submission.find({
            user:userId
        })

        res
        .status(200)
        .json({
            success:true,
            data:{
                Submission: submission
            }
        })

    } catch (error) {
        next(error);
    }
}