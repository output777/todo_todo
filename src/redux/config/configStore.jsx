import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../modules/loginSlice";
import PlannerSlice from "../modules/plannerSlice";
import mainSlice from "../modules/mainSlice";
import mySlice from "../modules/mySlice";
import statisticsSlice from "../modules/statisticsSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    planner: PlannerSlice,
    main: mainSlice,
    my: mySlice,
    statistics: statisticsSlice,
  },
});
