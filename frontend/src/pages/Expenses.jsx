import React from "react";
import {motion} from "framer-motion"
const Expenses = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      Expenses
    </motion.div>
  );
};

export default Expenses;
