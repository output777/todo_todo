import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../modules/loginSlice";
import PlannerSlice from "../modules/plannerSlice";

export const store = configureStore({
  reducer: {
    loginSlice,
    PlannerSlice,
  },
});
