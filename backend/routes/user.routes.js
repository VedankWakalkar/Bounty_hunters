import express from "express";
import { Router } from "express";

import { getUser, getUsers } from "../controllers/user.controllers";
import { authorize } from "../middlewares/auth.middlewares";

const userRouter=Router();

userRouter.get('/',getUsers);
userRouter.get('/:id',authorize,getUser);
