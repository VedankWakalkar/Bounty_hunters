import { companySignIn, companySignOut, companySignUp, getSubmissions, updateSubmission } from "../controllers/company.controllers.js";
import express from "express";
import { Router } from "express";
import authorizeCompany from "../middlewares/compnay.middlewares.js";
import { createBounty, deleteBountyById, getAllBounties, getBountyById, updateBountyById } from "../controllers/bounty.controllers.js";

const companyRouter=Router();

companyRouter.post('/sign-up',companySignUp);
companyRouter.post('/sign-in',companySignIn);
companyRouter.post('/sign-out',companySignOut);

// protected route

companyRouter.post("/bounties",authorizeCompany,createBounty);
companyRouter.get("/bounties",authorizeCompany,getAllBounties);
companyRouter.get("/bounties/:id",authorizeCompany,getBountyById);
companyRouter.put("/bounties/:id",authorizeCompany,updateBountyById);
companyRouter.delete("/bounties/:id",authorizeCompany,deleteBountyById);
companyRouter.get("/submissions",authorizeCompany,getSubmissions);
companyRouter.patch("/submissions/:id",authorizeCompany,updateSubmission)

export default companyRouter;