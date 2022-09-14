import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import ECharts, { EChartsReactProps } from "echarts-for-react";
import * as echarts from "echarts";

const BarChart = () => {
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

  const [options, setOptions] = useState({
    xAxis: {
      type: "category",
      data: ["저번주 / 이번주"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        type: "bar",
        data: [25],
        color: ["gray"],
      },
      {
        type: "bar",
        data: [50],
        color: ["#ffb671"],
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
        height: "130em",
        margin: "auto",
        color: "#91cc75",
      }}
      style={{
        height: "100px",
        width: "70%",
        margin: "auto",
        backgroundColor: "transparent",
      }}
    />
  );
};

export default BarChart;
