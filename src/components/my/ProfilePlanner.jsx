import React, { useEffect } from "react";
import MypageCalender from "./MypageCalender";
import { useDispatch, useSelector } from "react-redux";
import { __getTodo } from "../../redux/modules/plannerSlice";
import doneSvg from "../../assets/img/doneSvg.svg";
import notDoneSvg from "../../assets/img/notDoneSvg.svg";
import styled from "styled-components";
import PlannerCategory from "../planner/PlannerCategory";

const ProfilePlanner = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getTodo());
  }, [dispatch]);

  const { todos } = useSelector((state) => state.planner);

  return (
    <div>
      <PlannerCategory />
    </div>
  );
};

export default ProfilePlanner;
