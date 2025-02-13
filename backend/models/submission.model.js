import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    bounty:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Bounty"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    reportDetails:{
        type:String,
        required:[true,"Report Details is Required."]
    },
    proof:{
        type:String
    },
    status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending"
    },
    rewardPaid:{
        type:String,
        enum:["Paid","Not Paid"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},
{timeStamp:true})

const Submission=mongoose.model("Submission",submissionSchema);

export default Submission;