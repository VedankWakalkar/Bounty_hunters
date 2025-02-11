import mongoose from "mongoose";
import { DB_URI,NODE_ENV } from "../config/env";

if(!DB_URI){
    throw new Error(`Please define the MONGODB_URI envirnoment variable inside .env<development/production>.local`)
}

const connectToDatabase= async()=>{
    try{    
        await mongoose.connect(DB_URI);
        console.log(`Connected to the Database in ${NODE_ENV} mode`)
    }catch(error){
        console.log("Some Error Occured: ",error);
        process.exit(1);   
    }
}

export default connectToDatabase;