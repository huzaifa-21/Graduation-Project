import express from "express";
import { addUser, getUser, getUsers, login } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/add", addUser);
userRouter.get("/get", getUser);
userRouter.get("/all", getUsers);
userRouter.post("/login", login);

export default userRouter;
