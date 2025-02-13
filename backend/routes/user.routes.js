import express from "express";
import { Router } from "express";

import { createSubmission, getSubmissions, getUser, getUsers } from "../controllers/user.controllers.js";
import { authorize } from "../middlewares/auth.middlewares.js";
import { getAllBounties } from "../controllers/bounty.controllers.js";

const userRouter=Router();

userRouter.get('/',getUsers);

// protected route

userRouter.get('/:id',authorize,getUser);
userRouter.get('/bounties',authorize,getAllBounties);
userRouter.post('/submit-bounty',authorize,createSubmission);
userRouter.get('/get-submissions',authorize,getSubmissions);

export default userRouter;