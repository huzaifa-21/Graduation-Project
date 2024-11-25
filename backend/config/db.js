import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv()

export const connectDb = async () => {
  await mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("db connected successfully")
  })
}