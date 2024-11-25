import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import userRouter from "./routers/userRouter.js";

const app = express();
connectDb();

// middlewares
configDotenv();
app.use(cors());
app.use(express.json());

// end points
app.use("/api/users",userRouter)

app.listen(4002, (req, res) => {
  console.log("api is working!");
});
