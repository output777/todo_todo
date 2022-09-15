import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const accessToken = localStorage.getItem("accessToken");
// const nickname = localStorage.getItem('nickname')
const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${accessToken}`,
  },
};

const initialState = {
  userInfo: null,
  images: [],
  isLoading: false,
  error: null,
};

export const __getMyInfo = createAsyncThunk(
  "getMyInfo",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${BASE_URL}/member`, config);
      console.log("data", data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postProfileImg = createAsyncThunk(
  "postProfileImg",
  async (payload, thunkAPI) => {
    console.log("payload", payload);
    try {
      const data = await axios.post(`${BASE_URL}/image/profile`, payload, config);
      console.log("data", data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getImages = createAsyncThunk(
  "getImages",
  async (payload, thunkAPI) => {
    console.log("payload", payload);
    try {
      const data = await axios.get(`${BASE_URL}/image/boast`, config);
      console.log("data", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const __postImages = createAsyncThunk(
  "postImages",
  async (payload, thunkAPI) => {
    console.log("payload", payload);
    try {
      const data = await axios.post(`${BASE_URL}/image/boast`, payload, config);
      console.log("data", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const mySlice = createSlice({
  name: "mySlice",
  initialState,
  reducers: {},
  extraReducers: {
    //__getMyInfo
    [__getMyInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [__getMyInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userInfo = action.payload;
    },
    [__getMyInfo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__postProfileImg
    [__postProfileImg.pending]: (state) => {
      state.isLoading = true;
    },
    [__postProfileImg.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userInfo.profileImage = action.payload;
    },
    [__postProfileImg.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getImages.pending]: (state) => {
      state.isLoading = true;
    },
    [__getImages.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log('action.payload', action.payload);
      state.images = action.payload.data;
    },
    [__getImages.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__postImages.pending]: (state) => {
      state.isLoading = true;
    },
    [__postImages.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__postImages.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }

  }
});

export const { } = mySlice.actions;
export default mySlice.reducer;