import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/env.js";
import Company from "../models/company.model.js";

const authorizeCompany = async (req,res,next)=>{
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(" ")[1];
        }

        if(!token){
            const error = new Error("Unauthorized, Please Provide Valid Token")
            error.statusCode=403;
            throw error;
        }
        const decoded=jwt.verify(token,JWT_SECRET)
        const company = await Company.findById(decoded.companyId)

        if(!company){
            const error= new Error("Company not found.")
            error.statusCode=404;
            throw error;
        }
        req.company=company;
        next();
    } catch (error) {
        next(error);
    }
}

export default authorizeCompany;