import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const KAKAO_BASE_URL = process.env.REACT_APP_KAKAO_BASE_URL

const initialState = {
  token: false,
}

export const __kakaoLogin = createAsyncThunk('kakao/login', async (payload, thunkAPI) => {
  try {
    const { data } = await axios.get(`${KAKAO_BASE_URL}?code=${payload}`)
    console.log(data);

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);


    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    console.log(error);
    // window.alert('로그인에 실패하였습니다.')
    return thunkAPI.rejectWithValue(error);
  }
})


export const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {},
  extraReducers: {
  }
})

export const { } = loginSlice.actions;
export default loginSlice.reducer;