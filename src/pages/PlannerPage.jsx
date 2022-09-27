import React, { useEffect } from "react";
import Navbar from "../components/utils/Navbar";
import PlannerCategory from "../components/planner/PlannerCategory";
import { useDispatch } from "react-redux";
import { __reset } from "../redux/modules/mainSlice";

const PlannerPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__reset())
  }, [])

  return (
    <>
      <PlannerCategory />
      <Navbar planner={true} />
    </>
  );
};

export default PlannerPage;

