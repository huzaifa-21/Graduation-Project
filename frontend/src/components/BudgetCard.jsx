import React, { useEffect, useState } from "react";
import { showDate } from "../utils/months";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const BudgetCard = ({ title, date, income, saving, id }) => {
  const budgetDate = new Date(date);

  return (
    <div className="budget-box box-shadow">
      <header className="budget-header">
        <h5>Budget {title}</h5>
        <span>{`${showDate(date)}`}</span>
      </header>
      <section className="budget-body">
        <div className="amount">
          <span className="amount-number">${income.toLocaleString()}</span>
          <span className="amount-label">Total amount</span>
        </div>
        <div className="saving">
          <span className="saving-number">${saving.toLocaleString()}</span>
          <span className="saving-label">Saving goal</span>
        </div>
      </section>
      <section className="budget-footer">
        <span className="remove-budget">Remove</span>
        <Link to={`/dashboard/balances/${id}`} className="main-btn">
          Details <FontAwesomeIcon icon={faAngleRight} />
        </Link>
      </section>
    </div>
  );
};

export default BudgetCard;
