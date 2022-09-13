import React from "react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
  mainRankList: [],
  isLoading: false,
  error: null,
};

export const __getMainRank = createAsyncThunk(
  "getMainRank",
  async (payload, thunkAPI) => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        // "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    console.log("payload", payload);
    try {
      // const data = await axios.get(`http://localhost:3001/test${payload}`);
      const data = await axios.get(
        `${BASE_URL}/rank/weekly?page=${payload}&size=${3}`,
        payload,
        config
      );
      console.log("data.data.content", data.data.content);
      return thunkAPI.fulfillWithValue(data.data.content);
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
