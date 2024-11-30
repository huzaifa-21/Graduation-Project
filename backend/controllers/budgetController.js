import Budget from "../models/budgetModel.js";

const addBudget = async (req, res) => {
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

const getBudget = async (req, res) => {
  const { id } = req.params;

  try {
    const budget = await Budget.findById(id).populate(
      "userId",
      "-password -__v"
    );
    if (!budget) {
      return res
        .status(404)
        .json({ success: false, message: "No budget found" });
    }
    res.json({
      success: true,
      data: budget,
      message: "Budget retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addBudget, getBudget, getAllBudgets };
