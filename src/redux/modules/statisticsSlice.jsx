import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const accessToken = localStorage.getItem("accessToken");
const config = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};

const initialState = {
  barData: [],
  lineData: [],
  heatmapData: [],
  isLoading: false,
  error: null,
};

export const __getBarChartData = createAsyncThunk(
  "getBarChartData",
  async (payload, thunkAPI) => {
    // console.log("payload", payload);
    try {
      const data = await axios.get(
        `${BASE_URL}/rank/lastweek/member`,
        payload,
        config
      );
      console.log("data", data);
      return thunkAPI.fulfillWithValue(data.data.content);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getLineChartData = createAsyncThunk(
  "getLineChartData",
  async (payload, thunkAPI) => {
    // console.log("payload", payload);
    try {
      const data = await axios.get(
        `${BASE_URL}/rank/lastweek/member`,
        payload,
        config
      );
      console.log("data", data);
      return thunkAPI.fulfillWithValue(data.data.content);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const statisticsSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [__getBarChartData.pending]: (state) => {
      state.isLoading = true;
    },
    [__getBarChartData.fulfilled]: (state, action) => {
      // console.log("action.payload", action.payload);
      state.isLoading = false;
      state.barData.push(...action.payload);
    },
    [__getBarChartData.rejected]: (state, action) => {
      state.isLoading = false;
      console.log("rejected action", action);
      state.error = action.payload.message;
    },
    [__getLineChartData.pending]: (state) => {
      state.isLoading = true;
    },
    [__getLineChartData.fulfilled]: (state, action) => {
      // console.log("action.payload", action.payload);
      state.isLoading = false;
      state.lineData.push(...action.payload);
    },
    [__getLineChartData.rejected]: (state, action) => {
      state.isLoading = false;
      console.log("rejected action", action);
      state.error = action.payload.message;
    },
  },
});

export default statisticsSlice.reducer;
