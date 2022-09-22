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

  dday: [],
  thisMonthRate: [],
  totalRate: [],
  mainRankList: [],
  mainRankListMonthly: [],
  mainRankListSchool: [],
  isLoading: false,
  error: null,
};

export const __getThisMonthRate = createAsyncThunk(
  "getThisMonthRate",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        `${BASE_URL}/todo/achievement/thismonth`,
        config
      );
      console.log("__getThisMonthRate data", data.data.achievementRate);
      return thunkAPI.fulfillWithValue(data.data.achievementRate);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getTotalRate = createAsyncThunk(
  "getTotalRate",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        `${BASE_URL}/todo/achievement/total`,
        config
      );
      console.log("__getTotalRate data", data.data.achievementRate);
      return thunkAPI.fulfillWithValue(data.data.achievementRate);
    } catch (error) {
      console.log("error", error);
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
      const data = await axios.get(
        `${BASE_URL}/rank/monthly?page=${payload}&size=${3}`,
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


export const __getDday = createAsyncThunk(
  "getDday",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${BASE_URL}/d-day`, config);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getMainRankSchool = createAsyncThunk(
  "getMainRankSchool",
  async (payload, thunkAPI) => {
    console.log("payload", payload);
    try {
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


export const __updateDday = createAsyncThunk(
  "updateDday",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.put(`${BASE_URL}/d-day`, payload, config);
      console.log("data", data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const mainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [__getThisMonthRate.pending]: (state) => {
      state.isLoading = true;
    },
    [__getThisMonthRate.fulfilled]: (state, action) => {
      console.log("action.payload", action.payload);
      state.isLoading = false;
      state.thisMonthRate = [Math.round(action.payload)];
    },
    [__getThisMonthRate.rejected]: (state, action) => {
      state.isLoading = false;
      console.log("rejected action", action);
      state.error = action.payload.message;
    },
    [__getTotalRate.pending]: (state) => {
      state.isLoading = true;
    },
    [__getTotalRate.fulfilled]: (state, action) => {
      console.log("action.payload", action.payload);
      state.isLoading = false;
      state.totalRate = [Math.round(action.payload)];
    },
    [__getTotalRate.rejected]: (state, action) => {
      state.isLoading = false;
      console.log("rejected action", action);
      state.error = action.payload.message;
    },
    [__getMainRank.pending]: (state) => {
      state.isLoading = true;
    },
    [__getMainRank.fulfilled]: (state, action) => {
      console.log("action.payload", action.payload);
      state.isLoading = false;
      state.mainRankList.push(...action.payload);
      state.mainRankListMonthly = [];
      state.mainRankListSchool = [];
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
      console.log("action.payload", action.payload);
      state.isLoading = false;
      state.mainRankListMonthly.push(...action.payload);
      state.mainRankList = [];
      state.mainRankListSchool = [];
    },
    [__getMainRankMonthly.rejected]: (state, action) => {
      state.isLoading = false;
      console.log("rejected action", action);
      state.error = action.payload.message;
    },
    [__getDday.pending]: (state) => {
      state.isLoading = true;
    },
    [__getDday.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log("dday", state.dday);
      //console.log("dday", action.payload);
      state.dday = action.payload;
    },
    [__getDday.rejected]: (state, action) => {
      state.isLoading = false;
      console.log("dday", action.payload);
      state.error = action.payload;
    },
    [__updateDday.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateDday.fulfilled]: (state, action) => {
      console.log("action.payload", action.meta.arg);
      console.log("state", state.dday);
      state.isLoading = false;
      state.dday.title = action.meta.arg.title;
      state.dday.selectedDate = action.meta.arg.selectedDate;
    },
    [__updateDday.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      console.log(state);
    },

    [__getMainRankSchool.pending]: (state) => {
      state.isLoading = true;
    },
    [__getMainRankSchool.fulfilled]: (state, action) => {
      console.log("action.payload", action.payload);
      state.isLoading = false;
      state.mainRankListSchool.push(...action.payload);
      state.mainRankList = [];
      state.mainRankListMonthly = [];
    },
    [__getMainRankSchool.rejected]: (state, action) => {
      state.isLoading = false;
      console.log("rejected action", action);
      state.error = action.payload.message;
    },
  },
});

export default mainSlice.reducer;
