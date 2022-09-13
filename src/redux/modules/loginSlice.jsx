import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const KAKAO_BASE_URL = process.env.REACT_APP_KAKAO_BASE_URL;
const GOOGLE_BASE_URL = process.env.REACT_APP_GOOGLE_BASE_URL;

const initialState = {
  user: null,
  nickname: null,
  token: false,
  nicknameCheck: null,
};

// 소셜 로그인
export const __kakaoLogin = createAsyncThunk(
  "kakao/login",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(`${KAKAO_BASE_URL}?code=${payload}`);
      console.log(data);

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      // window.alert('로그인에 실패하였습니다.')
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __googleLogin = createAsyncThunk(
  "google/login",
  async (payload, thunkAPI) => {
    console.log("payload", payload);
    try {
      const { data } = await axios.get(`${GOOGLE_BASE_URL}?code=${payload}`);
      console.log(data);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 회원 정보 받기
export const __nicknameCheck = createAsyncThunk(
  "nickname/check",
  async (payload, thunkAPI) => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    console.log("__nicknameCheck payload", payload);
    try {
      const { data } = await axios.post(
        `http://13.125.241.100/api/check-nickname`,
        payload,
        config
      );
      console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __userInfoRegister = createAsyncThunk(
  "userInfo/register",
  async (payload, thunkAPI) => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    console.log("__userInfoRegister payload", payload);
    try {
      const { data } = await axios.post(
        `http://13.125.241.100/api/signup`,
        payload,
        config
      );
      console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {},
  extraReducers: {
    // 카카오 소셜 로그인
    [__kakaoLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [__kakaoLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.nickname = action.payload.nickname;
      state.token = true;
    },
    [__kakaoLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 구글 소셜 로그인
    [__googleLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [__googleLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.nickname = action.payload.nickname;
      state.token = true;
    },
    [__googleLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // nickname check
    [__nicknameCheck.pending]: (state) => {
      state.isLoading = true;
    },
    [__nicknameCheck.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.nicknameCheck = action.payload;
    },
    [__nicknameCheck.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // userInfoRegister
    [__userInfoRegister.pending]: (state) => {
      state.isLoading = true;
    },
    [__userInfoRegister.fulfilled]: (state, action) => {
      state.isLoading = false;
      // state.user
      // state.nickname
    },
    [__userInfoRegister.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = loginSlice.actions;
export default loginSlice.reducer;
