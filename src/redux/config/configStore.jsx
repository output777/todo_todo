import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../modules/loginSlice";

export const store = configureStore({
  reducer: {
    loginSlice,
  }
})