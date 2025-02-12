import express from "express";
import { Router } from "express";

import { getUser, getUsers } from "../controllers/user.controllers.js";
import { authorize } from "../middlewares/auth.middlewares.js";

const userRouter=Router();

userRouter.get('/',getUsers);
userRouter.get('/:id',authorize,getUser);

export default userRouter;