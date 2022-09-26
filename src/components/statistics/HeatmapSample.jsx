import React, { useState, useEffect } from "react";
import HeatMap from "react-heatmap-grid";
import { __getHeatMapData } from "../../redux/modules/statisticsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";

const HeatMapSample = () => {
  const [heatMapDataRate, setHeatMapDataRate] = useState([[], [], [], [], [], [], []]);
  const { heatmapData } = useSelector((state) => state.statistics);

  console.log('heatmapData', heatmapData);

  const xLabels = new Array(10).fill(0).map((_, i) => `${i + 1}주`);
  // const xLabelsVisibility = new Array(10).fill().map((_, i) => i + 1);

  const yLabels = ["월", "화", "수", "목", "금", "토", "일"]; // 월, 화, 수, 목, 금, 토, 일
  // const yLabelsVisibility = new Array(7).fill().map((_, i) => i + 1);


  console.log('heatMapDataRate', heatMapDataRate.length > 0 && heatMapDataRate, Boolean(heatMapDataRate))

  useEffect(() => {
    const arr = [];
    const heatmapArr = [[], [], [], [], [], [], []]
    console.log("heatmapData", heatmapData);
    if (heatmapData.length > 0) {
      for (let i = 0; i < heatmapData.length; i++) {
        const data = heatmapData[i].achievementRate;
        arr.push(data);
      }
    }
    console.log("arr", arr);

    for (let i = 0; i < arr.length; i += 7) {
      heatmapArr[0].push(arr[i])
      heatmapArr[1].push(arr[i + 1])
      heatmapArr[2].push(arr[i + 2])
      heatmapArr[3].push(arr[i + 3])
      heatmapArr[4].push(arr[i + 4])
      heatmapArr[5].push(arr[i + 5])
      heatmapArr[6].push(arr[i + 6])
    }
    console.log('heatmapArr', heatmapArr);

    setHeatMapDataRate(heatmapArr);
  }, [heatmapData]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getHeatMapData());
  }, [dispatch]);

  return (
    <div
      style={{
        fontSize: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "12px",
        margin: 'auto',
        width: "90%",
        height: "25em",
        boxSizing: 'border-box',
        padding: '10px 20px 20px 0',
        backgroundColor: "white",
        boxShadow: "0px 4px 15px rgba(17, 17, 17, 0.05)",
      }}
    >
      <HeatMap
        xLabels={xLabels}
        yLabels={yLabels}
        // xLabelsLocation={"top"}
        // yLabelsLocation={"left"}
        // xLabelsVisibility={xLabelsVisibility}
        // yLabelsVisibility={yLabelsVisibility}
        xLabelWidth={25}
        yLabelWidth={15}
        data={heatMapDataRate.length > 0 && heatMapDataRate}
        squares
        height={30}
        cellStyle={(background, value, min, max, data, x, y) => ({
          background:
            value === undefined
              ? "#F3F3F3"
              :
              value <= 25
                ? "#F3F3F3"
                : value <= 50
                  ? "#FF8F2740"
                  : value <= 75
                    ? "#FF8F2780"
                    : value > 75
                      ? "#FF8F27"
                      : "null",
          color: "#111",
          fontSize: "1px",
          // height: "20em",
          // width: "30em",
          // margin: "0px",
        })}
      // cellRender={(value) => value && <div>{value}%</div>}
      />
    </div>
  );
};

export default HeatMapSample;
