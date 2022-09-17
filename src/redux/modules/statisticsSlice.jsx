import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const accessToken = localStorage.getItem("accessToken");
console.log(accessToken);
const config = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};

const initialState = {
  rankScoreData: [{}, {}, {}],
  barData: [{}, {}],
  lineData: [],
  heatmapData: [],
  isLoading: false,
  error: null,
};

export const __getRankScoreData = createAsyncThunk(
  "__getRankScoreData",
  async (payload, thunkAPI) => {
    try {
      const lastWeekData = await axios.get(
        `${BASE_URL}/rank/lastweek/member`,
        config
      );
      const weeklyData = await axios.get(
        `${BASE_URL}/rank/weekly/member`,
        config
      );
      const monthlyData = await axios.get(
        `${BASE_URL}/rank/monthly/member`,
        config
      );
      console.log("lastWeekData.data", lastWeekData.data);
      console.log("thisWeekData.data", weeklyData.data);
      console.log("monthlyData.data", monthlyData.data);
      return thunkAPI.fulfillWithValue([
        lastWeekData.data,
        weeklyData.data,
        monthlyData.data,
      ]);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getLineChartData = createAsyncThunk(
  "getLineChartData",
  async (payload, thunkAPI) => {
    // console.log("payload", payload);
    try {
      const data = await axios.get(`${BASE_URL}/rank/lastweek/member`, config);
      console.log("data.data", data.data);
      return thunkAPI.fulfillWithValue(data.data);
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
    [__getRankScoreData.pending]: (state) => {
      state.isLoading = true;
    },
    [__getRankScoreData.fulfilled]: (state, action) => {
      console.log("extraReducers action.payload", action.payload);
      state.isLoading = false;
      state.rankScoreData = action.payload;
    },
    [__getRankScoreData.rejected]: (state, action) => {
      state.isLoading = false;
      console.log("rejected action", action);
      state.error = action.payload.message;
    },

    [__getLineChartData.pending]: (state) => {
      state.isLoading = true;
    },
    [__getLineChartData.fulfilled]: (state, action) => {
      console.log("action.payload", action.payload);
      state.isLoading = false;
      state.lineData = action.payload;
    },
    [__getLineChartData.rejected]: (state, action) => {
      state.isLoading = false;
      console.log("rejected action", action);
      state.error = action.payload.message;
    },
  },
});

export default statisticsSlice.reducer;
