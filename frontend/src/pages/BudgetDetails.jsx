import React from 'react'
import { motion } from 'framer-motion';

const BudgetDetails = () => {
  return (
    <motion.div
      className="budget-details"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      BudgetDetails
    </motion.div>
  );
}

export default BudgetDetails