import React, { useEffect } from "react";
import Navbar from "../components/utils/Navbar";
import Statistics from "../components/statistics/Statistics";
import { useDispatch } from "react-redux";
import { __reset } from "../redux/modules/mainSlice";

const StatisticsPage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__reset())
  }, [])

  return (
    <div>
      <Statistics />
      <Navbar statistics={true} />
    </div>
  );
};

export default StatisticsPage;
