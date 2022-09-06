import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI

const initialState = {
  token: false,
}

export const __kakaoLogin = createAsyncThunk('kakao/login', async (payload, thunkAPI) => {
  console.log(payload)
  try {
    const data = await axios.get(`http://13.125.241.100/user/kakao/callback?code=${payload}`)
    console.log(data);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
})

export const kakaoLoginSlice = createSlice({
  name: 'kakaoLogin',
  initialState,
  reducers: {},
  extraReducers: {

  }
})

export const { } = kakaoLoginSlice.actions;
export default kakaoLoginSlice.reducer;