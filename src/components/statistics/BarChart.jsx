import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ECharts, { EChartsReactProps } from "echarts-for-react";
import * as echarts from "echarts";
import { __getBarChartData } from "../../redux/modules/statisticsSlice";

const BarChart = () => {
  const { barData } = useSelector((state) => state.statistics);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getBarChartData());
    // setOptions({
    //   ...options,
    // });
  }, []);

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
      show: false,
    },
    yAxis: {
      type: "value",
      show: false,
    },
    series: [
      {
        type: "bar",
        data: [25],
        color: ["gray"],
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
        data: [50],
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
  });

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
