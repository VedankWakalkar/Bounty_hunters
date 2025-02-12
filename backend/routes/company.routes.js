import { companySignIn, companySignOut, companySignUp } from "../controllers/company.controllers.js";
import express from "express";
import { Router } from "express";
import authorizeCompany from "../middlewares/compnay.middlewares.js";
import { createBounty, getAllBounties, getBountyById } from "../controllers/bounty.controllers.js";

const companyRouter=Router();

companyRouter.post('/sign-up',companySignUp);
companyRouter.post('/sign-in',companySignIn);
companyRouter.post('/sign-out',companySignOut);

// protected route

companyRouter.post("/bounties",authorizeCompany,createBounty);
companyRouter.get("/bounties",authorizeCompany,getAllBounties);
companyRouter.get("/bounties/:id",authorizeCompany,getBountyById);
export default companyRouter;