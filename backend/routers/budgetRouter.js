import express from "express";
import {
  addBudget,
  getAllBudgets,
  getUserBudget,
} from "../controllers/budgetController.js";
import verifyToken from "../middleware/verifyToken.js";

const budgetRouter = express.Router();

budgetRouter.get("/", getAllBudgets);
budgetRouter.get("/get",verifyToken, getUserBudget);
budgetRouter.post("/add",verifyToken, addBudget);

export default budgetRouter;
