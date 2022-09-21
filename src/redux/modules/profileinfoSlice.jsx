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
  searchList: [],
  isLoading: false,
  error: null,
};

export const __getSearch = createAsyncThunk(
  "getSearch",
  async (payload, thunkAPI) => {
    console.log("payload", payload);
    try {
      const data = await axios.get(
        `${BASE_URL}/school?search=${payload.search}&page=${
          payload.page
        }&size=${5}`
      );
      return thunkAPI.fulfillWithValue(data.data.content);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: {
    [__getSearch.pending]: (state) => {
      state.isLoading = true;
    },
    [__getSearch.fulfilled]: (state, action) => {
      console.log("action.payload", action.payload);
      state.isLoading = false;
      state.searchList = action.payload;
    },
    [__getSearch.rejected]: (state, action) => {
      state.isLoading = false;
      console.log("rejected action", action);
      state.error = action.payload.message;
    },
  },
});

export default searchSlice.reducer;
