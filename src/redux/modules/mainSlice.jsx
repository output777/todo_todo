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
  thisMonthRate: [],
  totalRate: [],
  mainRankList: [],
  mainRankListMonthly: [],
  isLoading: false,
  error: null,
};

export const __getAchievementRate = createAsyncThunk(
  "getAchievementRate",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/todo/achievement/thismonth`, config);
      // const totalData = await axios.get(
      //   `${BASE_URL}/todo/achievement/total`,
      //   config
      // );
      console.log("temp", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log('error', error)
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getMainRank = createAsyncThunk(
  "getMainRank",
  async (payload, thunkAPI) => {
    console.log("payload", payload);

    try {
      const data = await axios.get(
        `${BASE_URL}/rank/weekly?page=${payload}&size=${3}`,
        // payload,
        config
      );

      console.log("data.data", data.data);
      console.log("data.data.content", data.data.content);
      return thunkAPI.fulfillWithValue(data.data.content);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getMainRankMonthly = createAsyncThunk(
  "getMainRankMonthly",
  async (payload, thunkAPI) => {
    console.log("payload", payload);
    try {
      // const data = await axios.get(`http://localhost:3001/test${payload}`);
      const data = await axios.get(
        `${BASE_URL}/rank/monthly?page=${payload}&size=${3}`,
        // payload,
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
    [__getAchievementRate.pending]: (state) => {
      state.isLoading = true;
    },
    [__getAchievementRate.fulfilled]: (state, action) => {
      // console.log("action.payload", action.payload);
      state.isLoading = false;
      state.achievementRate = action.payload;
      state.mainRankList = [];
      state.mainRankListMonthly = [];
    },
    [__getAchievementRate.rejected]: (state, action) => {
      state.isLoading = false;
      console.log("rejected action", action);
      state.error = action.payload.message;
    },
    [__getMainRank.pending]: (state) => {
      state.isLoading = true;
    },
    [__getMainRank.fulfilled]: (state, action) => {
      // console.log("action.payload", action.payload);
      state.isLoading = false;
      state.mainRankList.push(...action.payload)
      state.mainRankListMonthly = [];
    },
    [__getMainRank.rejected]: (state, action) => {
      state.isLoading = false;
      console.log("rejected action", action);
      state.error = action.payload.message;
    },
    [__getMainRankMonthly.pending]: (state) => {
      state.isLoading = true;
    },
    [__getMainRankMonthly.fulfilled]: (state, action) => {
      // console.log("action.payload", action.payload);
      state.isLoading = false;
      state.mainRankListMonthly.push(...action.payload);
      state.mainRankList = [];
    },
    [__getMainRankMonthly.rejected]: (state, action) => {
      state.isLoading = false;
      console.log("rejected action", action);
      state.error = action.payload.message;
    },
  },
});

export default mainSlice.reducer;
