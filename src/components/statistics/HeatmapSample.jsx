import React, { useState, useEffect } from "react";
import HeatMap from "react-heatmap-grid";
import { __getHeatMapData } from "../../redux/modules/statisticsSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const HeatMapSample = () => {
  const [heatMapDataRate, setHeatMapDataRate] = useState([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);
  const { heatmapData } = useSelector((state) => state.statistics);

  const xLabels = ['', '8주전', '', '6주전', '', '4주전', '', '2주전', '', '이번주'].reverse()
  // const xLabels = new Array(10).fill(0).map((_, i) => `${i + 1}주`);
  // const xLabelsVisibility = new Array(10).fill().map((_, i) => i + 1);

  const yLabels = ["월", "화", "수", "목", "금", "토", "일"]; // 월, 화, 수, 목, 금, 토, 일
  // const yLabelsVisibility = new Array(7).fill().map((_, i) => i + 1);

  useEffect(() => {
    const arr = [];
    const heatmapArr = [[], [], [], [], [], [], []];
    console.log("heatmapData", heatmapData);
    if (heatmapData.length > 0) {
      let heatmapDataLen = heatmapData.length
      for (let i = 0; i < heatmapDataLen; i++) {
        const data = heatmapData[i].achievementRate;
        arr.push(data);
      }
    }
    console.log("arr", arr);
    arr.reverse();
    console.log("arrReverse", arr);
    let len = arr.length;

    for (let i = 0; i < len; i += 7) {
      heatmapArr[6].push(arr[i])
      heatmapArr[5].push(arr[i + 1])
      heatmapArr[4].push(arr[i + 2])
      heatmapArr[3].push(arr[i + 3])
      heatmapArr[2].push(arr[i + 4])
      heatmapArr[1].push(arr[i + 5])
      heatmapArr[0].push(arr[i + 6])
    }
    console.log("heatmapArr", heatmapArr);

    setHeatMapDataRate(heatmapArr);
  }, [heatmapData]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getHeatMapData());
  }, [dispatch]);

  return (
    <StContainer>
      <HeatMap
        xLabels={xLabels}
        yLabels={yLabels}
        // xLabelsLocation={"top"}
        // yLabelsLocation={"left"}
        // xLabelsVisibility={xLabelsVisibility}
        // yLabelsVisibility={yLabelsVisibility}
        xLabelWidth={25}
        yLabelWidth={15}
        data={heatMapDataRate.length > 0 ? heatMapDataRate : null}
        squares
        height={30}
        cellStyle={(background, value, min, max, data, x, y) => ({
          background:
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
    </StContainer>
  );
};

const StContainer = styled.div`
    font-size: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    margin: auto;
    width: 90%;
    box-sizing: border-box;
    padding: 15px 25px 15px 0px;
    background-color: white;
    box-shadow: 0px 4px 15px rgba(17, 17, 17, 0.05);
`

export default HeatMapSample;
