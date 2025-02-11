import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

import {PORT} from"./config/env.js"

import connectToDatabase from "./database/mongodb.js";

const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/user",userRouter);


app.listen(PORT,async()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    await connectToDatabase();
})

export default app;