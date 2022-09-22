import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ECharts, { EChartsReactProps } from "echarts-for-react";
import * as echarts from "echarts";
import { __getLineChartData } from "../../redux/modules/statisticsSlice";

const LineChart = () => {
  const dispatch = useDispatch();
  const [lineDataRate, setLineDataRate] = useState([]);
  const { lineData } = useSelector((state) => state.statistics);

  // console.log('lineData', lineData)
  console.log(lineData.length > 0 && lineData[0].achievementRate);

  // echarts.registerTheme("myTheme", {
  //   backgroundColor: "#ffffff",

  //   title: {
  //     textStyle: {
  //       color: "#ffffff",
  //     },
  //   },
  //   legend: {
  //     textStyle: {
  //       color: "#ffffff",
  //     },
  //   },
  //   dataZoom: {
  //     textStyle: {
  //       color: "#ffffff",
  //     },
  //     borderColor: "#b9beed",
  //   },
  // });


  const options = {
    legend: {
      data: [
        //"상위랭커",
        // "이번주",
      ],
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
      // {
      //   name: "상위랭커",
      //   data: [100, 200, 300, 300, 370, 550, 620],
      //   type: "line",
      //   color: "#D34C4C",
      // },
      {
        // name: "이번주",
        data: lineDataRate,
        type: "line",
        color: "#618AF2",
      },
    ],

    grid: {
      left: "15%",
      top: "12%",
    },
  };

  useEffect(() => {
    const arr = [];
    console.log('lineData', lineData)
    if (lineData.length > 0) {
      for (let i = 0; i < lineData.length; i++) {
        const data = lineData[i].achievementRate;
        arr.push(data);
      }
    }
    console.log('arr', arr);
    setLineDataRate(arr);
  }, [lineData])

  console.log('lineDataRate', lineDataRate)

  useEffect(() => {
    dispatch(__getLineChartData());
  }, [dispatch]);

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
        boxShadow: "0px 4px 15px rgba(17, 17, 17, 0.05)",
        borderRadius: "12px",
      }}
    />
  );
};

export default LineChart;
