import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const KAKAO_BASE_URL = process.env.REACT_APP_KAKAO_BASE_URL

const initialState = {
  token: false,
}

export const __kakaoLogin = createAsyncThunk('kakao/login', async (payload, thunkAPI) => {
  console.log(payload)
  try {
    const data = await axios.get(`${KAKAO_BASE_URL}?code=${payload}`)
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