const mongoose =requie("mongoose")

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePhoto:{
        type:String,
        default:""
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    github:{
        type:String,
        default:""
    },
    skills:{
        type:[String],
        default:[]
    },
    bio:{
        type:String,
        default:""
    },
    earnedRewards:{
        type:Number,
        default:0
    },
    submissions: [
        {
          bountyId: { type: mongoose.Schema.Types.ObjectId, ref: "Bounty" },
          solutionCode: { type: String, required: true }, // GitHub repo link or code snippet
          solutionImage: { type: String }, // URL of the image stored in Cloudinary/S3
          submissionDate: { type: Date, default: Date.now },
          status: {
            type: String,
            enum: ["Pending", "Accepted", "Rejected"],
            default: "Pending"
          },
          rewardReceived: { type: Number, default: 0 } // Amount received if accepted
        }
      ],createdAt: {
        type: Date,
        default: Date.now
      }
})

const user= mongoose.model("user",userSchema)
module.exports =user 