import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {toast} from "react-toastify"
import axios from "axios";
import { config } from "../../config/config";
import { axiosInstance } from "../../utils/axiosInstance";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    if (localStorage.getItem("accessToken")) {
      const response = await axiosInstance.get(`${config.BASE_URL}users/get`);
      return response.data.data;
    }
  } catch (error) {
    return error.message;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "user",
    id: null,
    status: "idle",
    erros: null,
  },
  reducers: {
    updateUser: (state, action) => {
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.name = action?.payload?.name ;
        state.id = action?.payload?.id;
        state.status = "succeeded"
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.erros = action.error.message;
      });
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
