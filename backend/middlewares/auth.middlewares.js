import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/env";
import User from "../models/user.model";

export const authorize = async(req,res,next)=>{
    try {
        let token;
        
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token= req.headers.authorization.split(' ')[1];
        }

        if(!token){
            const error = new Error("Unathorized");
            error.statusCode=404;
            throw error
        }
        const decoded= jwt.verify(token,JWT_SECRET);
        const user = await User.findById(decoded.userId);
        
        if(!user){
            const error= new Error("User not found.");
            error.statusCode=404;
            throw error;
        }
        req.user=user;
        next();
    } catch (error) {
        next(error)
    }
}