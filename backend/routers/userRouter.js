import express from "express";
import { getUser, getUsers, login, registerUser } from "../controllers/userController.js";
import verifyToken from "../middleware/verifyToken.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.get("/get",verifyToken, getUser);
userRouter.get("/all", getUsers);
userRouter.post("/login", login);

export default userRouter;
