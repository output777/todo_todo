import React from "react";
import Calendar from "../components/statisticsPage/Calendar";
import HeatmapSample from "../components/statisticsPage/HeatmapSample";
import Navbar from "../components/utils/Navbar";
import Statistics from "../components/statisticsPage/Statistics";

const StatisticsPage = () => {
  return (
    <div>
      <Statistics />
      {/* <HeatmapSample />;
      <Calendar /> */}
      <Navbar />
    </div>
  );
};

export default StatisticsPage;
