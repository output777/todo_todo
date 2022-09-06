import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: false,
};

export const __googleLogin = createAsyncThunk(
  "google/login",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const data = await axios.get(
        `http://13.125.241.100/user/google/callback?code=${payload}`
      );
      console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const googleLoginSlice = createSlice({
  name: "googleLogin",
  initialState,
  reducers: {},
  extraReducers: {},
});

export const {} = googleLoginSlice.actions;
export default googleLoginSlice.reducer;
