import express from "express";
import {
  addBudget,
  getAllBudgets,
  getBudget,
} from "../controllers/budgetController.js";

const budgetRouter = express.Router();

budgetRouter.get("/", getAllBudgets);
budgetRouter.get("/get/:id", getBudget);
budgetRouter.post("/add", addBudget);

export default budgetRouter;
