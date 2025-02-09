import { configureStore } from "@reduxjs/toolkit";
import budgetSlice from "./slices/budgetSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    budget: budgetSlice,
    user: userSlice,
  },
});

export default store;
