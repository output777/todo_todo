import { configureStore } from "@reduxjs/toolkit";
import kakaoLoginSlice from "../modules/loginSlice";

export const store = configureStore({
  reducer: {
    kakaoLoginSlice,
  }
})