import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Overview from "./Overview";
import Balances from "./Balances";
import Goals from "./Goals";
import Expenses from "./Expenses";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <main>
        <header className="dashboard-header">
          <h2>Welcome Back, [User Name]</h2>
          <p>Your financial health at a glance.</p>
        </header>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="balances" element={<Balances />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="goals" element={<Goals />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
