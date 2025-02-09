import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchBudget } from "../context/slices/budgetSlice";
import Spinner from "../utils/Spinner";
import BudgetCard from "../components/BudgetCard";
import { Link } from "react-router-dom";
const Balances = () => {
  
  const { budget, status } = useSelector((state) => state.budget);


  if (status !== "succeeded") {
    return <Spinner />;
  }

  if (budget.length < 1 || !budget) {
    return (
      <motion.div
        className="not-available"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="col-md-6 col-xl-4 align-item-center">
          <div className="budget-option box-shadow mt-3 ms-2">
            <button className="main-btn d-block my-5 mx-auto">Add Budget</button>
          </div>
        </div>
      </motion.div>
    );
  }
  console.log(budget);
  return (
    <motion.div
      className="balances"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <div className="row">
          {budget.map((budget, index) => {
            return (
              <div className="col-md-6 col-xl-4" key={index}>
                <BudgetCard
                  title={index + 1}
                  date={budget.date}
                  income={budget.income}
                  saving={budget.savingsGoal}
                  id={budget._id}
                />
              </div>
            );
          })}
          <div className="col-md-6 col-xl-4">
            <div className="budget-option box-shadow">
              <button className="main-btn">Add Budget</button>
              <Link to="">Edit Budget</Link>
            </div>
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default Balances;
