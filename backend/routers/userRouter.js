import express from "express";
import { addUser, getUser, login } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/add", addUser);
userRouter.get("/get", getUser);
userRouter.post("/login", login);

export default userRouter;
