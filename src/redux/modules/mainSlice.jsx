import React from "react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  mainRankList: [],
  isLoading: false,
  error: null,
};

export const __getMainRank = createAsyncThunk(
  "getMainRank",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`http://localhost:3001/test${payload}`);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const mainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [__getMainRank.fulfilled]: (state, action) => {
      console.log("action.payload", action.payload);
      state.isLoading = false;
      state.mainRankList.push(...action.payload);
    },
    [__getMainRank.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getMainRank.pending]: (state) => {
      state.isLoading = true;
    },
  },
});

export default mainSlice.reducer;
