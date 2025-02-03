const express=require("express");
const userRouter = require("./userRouter");
const companyRouter = require("./companyRouter");
const rootRouter=express.Router();

rootRouter.use("/user",userRouter);
rootRouter.use('/company',companyRouter)

module.exports =rootRouter;