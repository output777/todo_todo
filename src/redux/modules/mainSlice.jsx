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
      // const data = await axios.get(
      //   `http://http://13.125.241.100/?/page=${payload}&size=3`
      // );
      // console.log("data.data", data.data);
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
      // console.log("action.payload", action.payload);
      state.isLoading = false;
      state.mainRankList.push(...action.payload);
    },
    [__getMainRank.rejected]: (state, action) => {
      state.isLoading = false;
      console.log("rejected action", action);

      state.error = action.payload.message;
    },
    [__getMainRank.pending]: (state) => {
      state.isLoading = true;
    },
  },
});

export default mainSlice.reducer;
