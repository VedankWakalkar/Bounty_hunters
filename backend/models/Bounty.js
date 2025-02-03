const mongoose=require("mongoose")


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
        required:false
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
      },
      rewardAmount: {
        type: Number, // Cash prize or token-based reward
        required: true
      },
      rewardType: {
        type: String,
        enum: ["Cash", "Crypto", "Swag", "Job Offer"],
        default: "Cash"
      },
      deadline: {
        type: Date, // Last date to submit the solution
        required: true
      },
      status: {
        type: String,
        enum: ["Open", "Closed", "In Review"],
        default: "Open"
      },
      submissions: [
        {
          programmerId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
          solutionCode: { type: String, required: true }, // GitHub repo link or code snippet
          solutionImage: { type: String }, // Cloudinary/S3 Image URL
          submissionDate: { type: Date, default: Date.now },
          status: {
            type: String,
            enum: ["Pending", "Accepted", "Rejected"],
            default: "Pending"
          }
        }
      ],
      createdAt: {
        type: Date,
        default: Date.now
      }
});
    
const Bounty = mongoose.model("Bounty", bountySchema);
    
module.exports = Bounty;