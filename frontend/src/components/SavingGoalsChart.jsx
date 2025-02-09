import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faTrophy } from "@fortawesome/free-solid-svg-icons";

ChartJS.register(ArcElement, Tooltip, Legend);

const SavingsGoalChart = ({ budgets, size = 200 }) => {
  if (!budgets || budgets.length === 0) return <p>No data available</p>;

  // Handle single budget for the half-circle
  const budget = Array.isArray(budgets) ? budgets[0] : budgets;
  const savingsGoal = budget.savingsGoal || 0;
  const currentSavings = budget.currentTotal || 1350;

  const data = {
    labels: ["Savings Achieved", "Remaining Goal"],
    datasets: [
      {
        data: [currentSavings, Math.max(0, savingsGoal - currentSavings)],
        backgroundColor: ["#299d91", "#e0e0e0"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    cutout: "85%", // Creates a ring shape
    circumference: 180, // Half-circle
    rotation: 270, // Starts from the top
  };

  return (
    <div
      className="chart-container"
      style={{
        position: "relative",
        height: `${size / 2}px`, // Maintain half-circle aspect ratio
        width: "100%",
      }}
    >
      <Doughnut data={data} options={options} />
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          fontSize: "14px",
          fontWeight: "bold",
          lineHeight: "1.2",
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        <span
          className="title"
          style={{
            placeSelf: "flex-end",
            fontSize: "10px",
            display: "block",
            marginBottom: "-4px",
            marginLeft: "5px",
            fontWeight: "600",
          }}
        >
          Target vs Achievment
        </span>
        <div
          className="target"
          style={{
            display: "flex",
            flex: "1",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
            marginBottom: "-24px",
            marginLeft: "130px",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              fontWeight: "normal",
            }}
          >
            <div style={{ color: "#9f9f9f", marginBottom: "3px" }}>
              <FontAwesomeIcon icon={faTrophy} className="me-1" />
              Target Achieved
            </div>
            <b style={{ fontSize: "17px" }}>
              ${currentSavings.toLocaleString()}
            </b>
          </div>
          <div
            style={{
              fontSize: "10px",
              color: "#94A3B8",
              fontWeight: "normal",
            }}
          >
            <div style={{ color: "#9f9f9f", marginBottom: "3px" }}>
              <FontAwesomeIcon icon={faBullseye} className="me-1" />
              This month Target
            </div>
            <b style={{ color: "black", fontSize: "17px" }}>
              ${savingsGoal.toLocaleString()}
            </b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsGoalChart;
