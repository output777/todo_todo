import React, { useEffect } from "react";
import HeatMap from "react-heatmap-grid";
import { __getHeatMapData } from "../../redux/modules/statisticsSlice";
import { useDispatch } from "react-redux";

export default function () {
  const xLabels = new Array(10).fill(0).map((_, i) => `${i + 1}주`);
  const xLabelsVisibility = new Array(13).fill(0).map((_, i) => i + 1);

  const yLabels = ["", "", "", "", "", "", ""]; // 월, 화, 수, 목, 금, 토, 일
  const yLabelsVisibility = new Array(10).fill(0).map((_, i) => i + 1);
  const data = new Array(yLabels.length)
    .fill(0)
    .map(() =>
      new Array(xLabels.length)
        .fill(0)
        .map(() => Math.floor(Math.random() * 100))
    );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getHeatMapData());
  }, []);

  return (
    <div
      style={{
        fontSize: "10px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "12px",
        width: "90%",
        height: "25em",
        margin: "0px auto",
        backgroundColor: "white",
        boxShadow: "0px 4px 15px rgba(17, 17, 17, 0.05)",
      }}
    >
      <HeatMap
        xLabels={xLabels}
        yLabels={yLabels}
        xLabelsLocation={"top"}
        xLabelsVisibility={xLabelsVisibility}
        yLabelsVisibility={yLabelsVisibility}
        xLabelWidth={25}
        yLabelWidth={0}
        data={data}
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
          color: "transparent",
          fontSize: "1px",
          // height: "20em",
          // width: "30em",
          // margin: "0px",
        })}
        cellRender={(value) => value && <div>{value}%</div>}
      />
    </div>
  );
}
