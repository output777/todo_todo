import React from "react";
import Navbar from "../components/utils/Navbar";
import Statistics from "../components/statistics/Statistics";

const StatisticsPage = () => {
  return (
    <div>
      <Statistics />
      <Navbar statistics={true} />
    </div>
  );
};

export default StatisticsPage;
