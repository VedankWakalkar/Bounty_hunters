import mongoose from "mongoose"

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        unique:true,
        trim:true,
        minLength:2,
        maxLength:10
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        trim:true,
        lowercase:true,
        match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minLength:6,
    },
    profilePhoto:{
        type:String,
        default:"",
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
    reputation:{
        type: Number,
        default: 0
    },
    earnedRewards:{
        type:Number,
        default:0
    },
    submissions: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Submission"
    }]
},{timestamps:true})

const User= mongoose.model("User",userSchema)

export default User; 