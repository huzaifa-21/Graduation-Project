import Budget from "../models/budgetModel.js";

const addBudget = async (req, res) => {
  const { userId, amount, income, expenses, savingsGoal } = req.body;
  const newBudget = new Budget({
    userId,
    amount,
    income,
    expenses,
    savingsGoal,
  });
};

export { addBudget };
