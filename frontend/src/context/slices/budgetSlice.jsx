import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../../config/config";
import { axiosInstance } from "../../utils/axiosInstance";

export const fetchBudget = createAsyncThunk(
  "budget/fetchBudget",
  async (userId) => {
    try {
      const response = await axiosInstance.get(`${config.BASE_URL}budget/get`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

const budgetSlice = createSlice({
  name: "budget",
  initialState: {
    budget: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudget.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBudget.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.budget = action?.payload;
      })
      .addCase(fetchBudget.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default budgetSlice.reducer;
