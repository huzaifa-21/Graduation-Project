import React from "react";
import Card from "../components/Card";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
const Overview = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <section className="overview">
          <Card title="Total Budget" amount="$5000" />
          <Card title="Expenses" amount="$3200" />
          <Card title="Savings" amount="$1800" />
        </section>

        <section className="recent-transactions">
          <h3>Recent Transactions</h3>
          <ul>
            <li>Groceries - $120</li>
            <li>Electricity Bill - $50</li>
            <li>Transport - $30</li>
          </ul>
        </section>
      </Container>
    </motion.div>
  );
};

export default Overview;
