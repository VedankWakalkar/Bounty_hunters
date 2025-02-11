import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type: String,
        enum: ["Pending", "Completed", "Failed"],
        default: "Pending" 
    },
    paymentMethod:{
        type:String,
        enum:["Stripe","Crypto","Bank Transfer"],
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})

const Trasaction=mongoose.model("Transaction",transactionSchema);

export default Trasaction;