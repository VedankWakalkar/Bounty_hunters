const express= require("express")
const userRouter= express.Router()
const zod=require('zod')

const userSignupSchema=zod.object({
    username:zod.string(),
    password:zod.string(),
    email:zod.string().email()
})

userRouter.post("/auth/signup",async (req,res)=>{
    const {sucess}=userSignupSchema.safeParse(req.body);
    if(!sucess){
        return res.status(411).json({
            message:"Invalid Inputs"
        })  
    }
    const existingUser = await 
})

module.exports=userRouter