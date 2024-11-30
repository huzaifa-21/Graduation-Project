import React from "react";
import {motion} from "framer-motion"
import { Container } from "react-bootstrap";
const Expenses = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container>Expenses</Container>
    </motion.div>
  );
};

export default Expenses;
