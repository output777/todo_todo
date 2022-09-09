import React from "react";
import Calendar from "react-calendar";
import HeatmapSample from "../components/statisticsPage/HeatmapSample";

const StatisticsPage = () => {
  return (
    <div>
      StatisticsPage
      <HeatmapSample />;
      <Calendar />
    </div>
  );
};

export default StatisticsPage;
