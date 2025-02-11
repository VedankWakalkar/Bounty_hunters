import mongoose from "mongoose";

const companySchema= new mongoose.Schema({
    name : {
        type:String,
        required:[true,"Company's Name is requied"],
        trim:true,
        minLength:3,
        maxLength:100
    },
    email : {
        type:String,
        required:[true,"Company's Email is requied"],
        lowercase:true
    },
    website : {
        type:String,
        required:[true,"Website link is required"]
    },
    description:{
        type:String,
        required:true
    },
    postedBounty:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Bounty"
    }],
    createdAt:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})

const Company= mongoose.model("Company",companySchema);

export default Company;