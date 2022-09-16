import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ECharts, { EChartsReactProps } from "echarts-for-react";
import * as echarts from "echarts";

const BarChart = () => {
  const { rankScoreData } = useSelector((state) => state.statistics);

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

  const options = {
    //State 일때는 왜 안되는지 파악하기
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
        type: "bar",
        data: [rankScoreData[0].score],
        color: ["lightgray"],
        stack: "Total",
        label: {
          show: true,
          position: "top",
          color: "gray",
          fontWeight: "bold",
        },
      },
      {
        type: "bar",
        data: [rankScoreData[1].score],
        color: ["#ffb671"],
        label: {
          show: true,
          position: "top",
          color: "#ffb671",
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
