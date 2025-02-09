import Budget from "../models/budgetModel.js";

const addBudget = async (req, res) => {
  // const {id:userId} = req.user
  const { userId, income, expenses, savingsGoal, currentTotal } = req.body;

  if (!userId || !income || !savingsGoal) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    const newBudget = new Budget({
      userId,
      income,
      maxBudget: income - savingsGoal,
      expenses,
      currentTotal: currentTotal || 0,
      savingsGoal,
    });

    await newBudget.save();
    res.status(201).json({
      success: true,
      data: newBudget,
      message: "Budget created successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json({
      success: true,
      data: budgets,
      message: "All budgets retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserBudget = async (req, res) => {
  try {
    const { id } = req.user;
    // Find the budget for the specific user
    const budget = await Budget.find({ userId: id }).populate(
      "userId",
      "-__v -password"
    );

    if (!budget) {
      return res
        .status(404)
        .json({ success: false, message: "Budget not found for the user" });
    }

    res.status(200).json({
      success: true,
      data: budget,
      message: "User's budget retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addBudget, getAllBudgets, getUserBudget };
