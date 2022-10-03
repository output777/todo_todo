import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ECharts, { EChartsReactProps } from "echarts-for-react";
import * as echarts from "echarts";

const BarChart = () => {
  const { rankScoreData } = useSelector((state) => state.statistics);

  // ---------------- 점수 소수점 반올림 ----------------
  let lastweekScore = rankScoreData[0].score;
  let lastweekScore2 =
    lastweekScore == 0 || "null" ? 0 : (lastweekScore / 7).toFixed(2);

  let weeklyScore = rankScoreData[1].score;
  let weeklyScore2 =
    weeklyScore == 0 || "null" ? 0 : (weeklyScore / 7).toFixed(2);

  const options = {
    //State 일때는 왜 안되는지 파악하기
    // legend: {
    //   data: ["저번주", "이번주"],
    // },
    xAxis: {
      type: "category",
      data: ["저번주 / 이번주"],
      show: false,
    },
    yAxis: {
      type: "value",
      show: false,
    },
    series: [
      {
        name: "저번주",
        type: "bar",
        data: [lastweekScore2],
        color: ["#D7D5D5"],
        stack: "Total",
        label: {
          show: true,
          position: "top",
          color: "#D7D5D5",
          fontWeight: "bold",
        },
      },
      {
        name: "이번주",
        type: "bar",
        data: [weeklyScore2],
        color: ["#FF7B00"],
        label: {
          show: true,
          position: "top",
          color: "#FF7B00",
          fontWeight: "bold",
        },
      },
    ],
    grid: {
      left: "15%",
      top: "20em",
      bottom: "30em",
    },
  };

  return (
    <ECharts
      option={options}
      // theme="myTheme"
      opts={{
        renderer: "",
        height: "110px",
        margin: "auto",
        color: "#91cc75",
      }}
      style={{
        height: "90px",
        width: "40%",
        margin: "auto",
        backgroundColor: "transparent",
      }}
    />
  );
};

export default BarChart;
