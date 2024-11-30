import mongoose from "mongoose";

const BudgetSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "users" },
  income: Number,
  maxBudget: Number,
  expenses: [
    {
      category: String,
      description: [{ name: String, amount: Number, _id: false }],
      date: { type: Date, default: Date.now },
      _id: false,
    },
  ],
  currentTotal: { type: Number, default: 0 },
  savingsGoal: Number,
});

const Budget = mongoose.model("budget", BudgetSchema);

export default Budget;
