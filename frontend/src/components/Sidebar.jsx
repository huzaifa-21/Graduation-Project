import React from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrosoft } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRightToBracket,
  faCrosshairs,
  faGear,
  faMoneyBillTransfer,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <img src={assets.letter_white} alt="" />
      <nav>
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FontAwesomeIcon icon={faMicrosoft} />
          Overview
        </NavLink>
        <NavLink
          to="/dashboard/balances"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FontAwesomeIcon icon={faWallet} />
          Balances
        </NavLink>
        <NavLink
          to="/dashboard/expenses"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FontAwesomeIcon icon={faMoneyBillTransfer} />
          Expenses
        </NavLink>
        <NavLink
          to="/dashboard/goals"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FontAwesomeIcon icon={faCrosshairs} />
          Goals
        </NavLink>
      </nav>
      <Link className="logout" to="/account/login">
        <FontAwesomeIcon icon={faArrowRightToBracket} />
        Logout
      </Link>
    </div>
  );
};

export default Sidebar;
