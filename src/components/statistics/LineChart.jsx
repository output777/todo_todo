import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import ECharts, { EChartsReactProps } from "echarts-for-react";
import * as echarts from "echarts";

const LineChart = () => {
  echarts.registerTheme("myTheme", {
    backgroundColor: "#ffffff",

    title: {
      textStyle: {
        color: "#ffffff",
      },
    },
    legend: {
      textStyle: {
        color: "#ffffff",
      },
    },
    dataZoom: {
      textStyle: {
        color: "#ffffff",
      },
      borderColor: "#b9beed",
    },
  });
  useEffect(() => {
    setOptions({
      ...options,
      series: [{ data: [11, 22, 33, 55, 66, 70] }, { data: [20, 25, 45] }],
    });
  }, []);

  const [options, setOptions] = useState({
    xAxis: {
      type: "category",
      data: ["월", "화", "수", "목", "금", "토", "일"],
    },
    yAxis: {
      type: "value",
      // interval: 10,
      splitNumber: 3,
    },
    series: [
      {
        data: [10, 20, 23, 30, 50, 60, 63],
        type: "line",
      },
      {
        data: [20, 21, 25, 33, 51, 65, 70],
        type: "line",
      },
    ],
    grid: {
      left: "15%",
      top: "12%",
    },
  });

  return (
    <ECharts
      option={options}
      // theme="myTheme"
      opts={{
        renderer: "",
        height: "220em",
        margin: "auto",
        color: "#91cc75",
      }}
      style={{
        height: "11em",
        width: "90%",
        margin: "0px auto",
        backgroundColor: "white",
      }}
    />
  );
};

export default LineChart;
