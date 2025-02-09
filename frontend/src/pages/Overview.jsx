// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Container } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { fetchBudget } from "../context/slices/budgetSlice";
// import { Link } from "react-router-dom";
// import { showDate } from "../utils/months.jsx";
// import Spinner from "../utils/Spinner";
// import SavingsGoalChart from "../components/SavingGoalsChart.jsx";
// import NoData from "../components/noData.jsx";

// const Overview = () => {
//   const { id ,status:userStatus} = useSelector((state) => state.user)
//   const { budget, status } = useSelector((state) => state.budget);

//   let [expenses, setExpenses] = useState([]);
//   const dispatch = useDispatch();
  
//   function getExpensesDetails(budget) {
//     let budgets = [];
//     let expenseTotal = 0;
//     budget.forEach((element, elementIndex) => {
//       let expense;
//       let budgetTotal = 0;
//       let category = [];
//       let total = 0;
//       element.expenses.forEach((item, index) => {
//         total = 0; // reset counter for the next category
//         item.description.forEach((item) => {
//           budgetTotal += item.amount; // count the budget total
//           total += item.amount;
//         });
//         category.push({
//           category: item.category,
//           items: item.description,
//           total,
//         });
//       });
//       expense = { categories: category, total: budgetTotal };
//       expenseTotal += budgetTotal;
//       budgets.push(expense);
//     });
//     budgets.push({ expenseTotal });
//     setExpenses(budgets);
//   }
//   function getTotalAmount(budget) {
//     let totalAmount = 0;
//     budget.forEach((budget) => (totalAmount += budget.income));
//     return totalAmount;
//   }

//   useEffect(() => {
//     if (status !== "succeeded" ) {
//       dispatch(fetchBudget(id));
//     }
    
//     if (status === "succeeded") {
//       getExpensesDetails(budget);
//       getTotalAmount(budget);
//     }
//   }, [status]);

//   if (status == "loading") {
//     return <Spinner />;
//   }

//   if (expenses.length < 1 || !expenses) {
//     return (
//       <motion.div
//         className="not-available"
//         initial={{ opacity: 0, x: 100 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         No Budget
//       </motion.div>
//     );
//   }

//   if(!budget || budget.length < 1) return <NoData />

//   // if(!budget || budget.length < 1) return <h1>no Data</h1>
//   return (
//     <motion.div
//       className="overview"
//       initial={{ opacity: 0, x: 100 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <Container>
//         <div className="row">
//           <div className="col-4">
//             <h5 className="box-header">Total Balance</h5>
//             <section className="overview-section bg-white box-shadow">
//               <header>
//                 <h5>
//                   {expenses.length >= 1
//                     ? `$${getTotalAmount(budget).toLocaleString()}`
//                     : "...loading"}
//                 </h5>
//                 <Link to="/dashboard/balances">All Budgets</Link>
//               </header>
//               {expenses.length >= 1  ? (
//                 <>
//                   <div className="category-box">
//                     <span className="category-name">Budget 1</span>
//                     <span className="category-total">
//                       ${budget[0].income.toLocaleString()}
//                     </span>
//                   </div>
//                   <div className="category-box">
//                     <span className="category-name">Budget 2</span>
//                     <span className="category-total">
//                       ${budget[1].income.toLocaleString()}
//                     </span>
//                   </div>
//                 </>
//               ) : (
//                 <p>No data available</p>
//               )}
//             </section>
//           </div>
//           <div className="col-4">
//             <h5 className="box-header">Goals</h5>
//             <section className="recent-transactions box-shadow">
//               <header>
//                 {expenses.length >= 1  ? (
//                   <>
//                     <h5>${budget[0].savingsGoal}</h5>
//                     <span>{`${showDate(budget[0].date)}`}</span>
//                   </>
//                 ) : (
//                   <p>loading goal</p>
//                 )}
//               </header>
//               <SavingsGoalChart budgets={budget} size={200} />
//             </section>
//           </div>
//           <div className="col-4">
//             <h5 className="box-header">Goals</h5>
//             <section className="recent-transactions box-shadow">
//               <h3>Recent Transactions</h3>
//               <ul>
//                 <li>Groceries - $120</li>
//                 <li>Electricity Bill - $50</li>
//                 <li>Transport - $30</li>
//               </ul>
//             </section>
//           </div>
//         </div>
//       </Container>
//     </motion.div>
//   );
// };

// export default Overview;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBudget } from "../context/slices/budgetSlice";
import { showDate } from "../utils/months.jsx";
import Spinner from "../utils/Spinner";
import SavingsGoalChart from "../components/SavingGoalsChart.jsx";
import NoData from "../components/noData.jsx";

const Overview = () => {
  const { id } = useSelector((state) => state.user);
  const { budget, status } = useSelector((state) => state.budget);
  const [expenses, setExpenses] = useState([]);
  const dispatch = useDispatch();

  // Fetch budget data if not already loaded
  useEffect(() => {
    if (status !== "succeeded") {
      dispatch(fetchBudget(id));
    }
  }, [status, dispatch, id]);

  // Process budget data to calculate expenses and totals
  useEffect(() => {
    if (status === "succeeded" && budget?.length > 0) {
      const processedExpenses = processBudgetData(budget);
      setExpenses(processedExpenses);
    }
  }, [status, budget]);

  // Function to process budget data and calculate expenses
  const processBudgetData = (budget) => {
    const budgets = [];
    let expenseTotal = 0;

    budget.forEach((element) => {
      const categories = element.expenses.map((item) => {
        const total = item.description.reduce(
          (sum, desc) => sum + desc.amount,
          0
        );
        return {
          category: item.category,
          items: item.description,
          total,
        };
      });

      const budgetTotal = categories.reduce((sum, cat) => sum + cat.total, 0);
      expenseTotal += budgetTotal;

      budgets.push({ categories, total: budgetTotal });
    });

    budgets.push({ expenseTotal });
    return budgets;
  };

  // Calculate total income from all budgets
  const getTotalAmount = (budget) => {
    return budget.reduce((sum, item) => sum + item.income, 0);
  };

  // Show loading spinner while data is being fetched
  if (status === "loading") {
    return <Spinner />;
  }

  // Show "No Data" component if there's no budget data
  if (!budget || budget.length < 1) {
    return <NoData />;
  }

  return (
    <motion.div
      className="overview"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <div className="row">
          {/* Total Balance Section */}
          <div className="col-4">
            <h5 className="box-header">Total Balance</h5>
            <section className="overview-section bg-white box-shadow">
              <header>
                <h5>${getTotalAmount(budget).toLocaleString()}</h5>
                <Link to="/dashboard/balances">All Budgets</Link>
              </header>
              {budget.map((item, index) => (
                <div className="category-box" key={index}>
                  <span className="category-name">Budget {index + 1}</span>
                  <span className="category-total">
                    ${item.income.toLocaleString()}
                  </span>
                </div>
              ))}
            </section>
          </div>

          {/* Savings Goals Section */}
          <div className="col-4">
            <h5 className="box-header">Goals</h5>
            <section className="recent-transactions box-shadow">
              <header>
                <h5>${budget[0].savingsGoal}</h5>
                <span>{showDate(budget[0].date)}</span>
              </header>
              <SavingsGoalChart budgets={budget} size={200} />
            </section>
          </div>

          {/* Recent Transactions Section */}
          <div className="col-4">
            <h5 className="box-header">Recent Transactions</h5>
            <section className="recent-transactions box-shadow">
              <h3>Recent Transactions</h3>
              <ul>
                {expenses[0]?.categories.map((category, index) => (
                  <li key={index}>
                    {category.category} - ${category.total.toLocaleString()}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default Overview;