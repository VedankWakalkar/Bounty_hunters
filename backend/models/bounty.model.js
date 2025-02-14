// const mongoose=require("mongoose")
import mongoose from "mongoose";

const bountySchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true 
    },
    skillsRequired:{
        type:[String],
        required:true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    rewardAmount: {
      type: Number,
      required: true
    },
    rewardType: {
      type: String,
      enum: ["Cash", "Crypto", "Swag", "Job Offer"],
      default: "Cash"
    },
    deadline: {
      type: Date, 
      required: true
    },
    status: {
      type: String,
      enum: ["Open", "Closed", "In Review"],
      default: "Open"
    },
    submission:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Submission"
      }
    ]
});
    
const Bounty = mongoose.model("Bounty", bountySchema);
    
export default Bounty;