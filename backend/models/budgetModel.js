import mongoose from "mongoose";

const BudgetSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "User" },
  income: Number,
  expenses: [
    {
      category: String,
      description: [{name:String,amount:Number}],
      date: { type: Date, default: Date.now },
    },
  ],
  savingsGoal: Number,
});

const Budget = mongoose.model("budget", BudgetSchema);

export default Budget;
