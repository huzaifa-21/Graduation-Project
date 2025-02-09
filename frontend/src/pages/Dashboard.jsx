import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Overview from "./Overview";
import Balances from "./Balances";
import Goals from "./Goals";
import Expenses from "./Expenses";
import Navbar from "../components/Navbar";
import BudgetDetails from "./BudgetDetails";
import { useDispatch, useSelector } from "react-redux";
import { fetchBudget } from "../context/slices/budgetSlice";
import Spinner from "../utils/Spinner";
import { toast } from "react-toastify";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { id ,name} = useSelector((state) => state.user);
  const { status } = useSelector((state) => state.budget);
  
  useEffect(() => {
    if (status !== "succeeded") {
      dispatch(fetchBudget(id));
      toast.success(`welcome ${name}`)
    }
  }, []);

  if (status !== "succeeded") return <Spinner />


  return (
    <div className="dashboard">
      <Sidebar />
      <main>
        <Navbar />
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="balances" element={<Balances />} />
          <Route path="balances/:id" element={<BudgetDetails />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="goals" element={<Goals />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
