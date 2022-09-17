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
    dispatch(__getLineChartData());
    let a = [30, 33, 15, 45, 34, 78];
    let b = [24, 43, 45, 78, 45, 56];
    // setOptions({
    //   ...options,
    //   series: [{ data: a }, { data: b }],
    // });
  }, []);

  const [options, setOptions] = useState({
    legend: {
      data: ["상위랭커", "이번주"],
    },

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
        name: "상위랭커",
        data: [100, 200, 300, 300, 370, 550, 620],
        type: "line",
        color: "#D34C4C",
      },
      {
        name: "이번주",
        data: [70, 120, 260, 270, 300, 370, 400],
        type: "line",
        color: "#618AF2",
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
        height: "210em",
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
