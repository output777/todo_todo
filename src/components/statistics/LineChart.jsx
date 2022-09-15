import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ECharts, { EChartsReactProps } from "echarts-for-react";
import * as echarts from "echarts";
import { __getLineChartData } from "../../redux/modules/statisticsSlice";

const LineChart = () => {
  const { data } = useSelector((state) => state.statistics);
  const dispatch = useDispatch();
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
    // dispatch(__getLineChartData());
    let a = [22, 33, 15, 45, 34, 78];
    let b = [24, 43, 45, 78, 45, 56];
    setOptions({
      ...options,
      series: [{ data: a }, { data: b }],
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
