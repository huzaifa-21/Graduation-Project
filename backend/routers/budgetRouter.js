import express from "express";
import { addBudget } from "../controllers/budgetController.js";

const budgetRouter = express.Router();

budgetRouter.post("/add", addBudget);

export default budgetRouter