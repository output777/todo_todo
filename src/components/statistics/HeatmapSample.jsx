import React from "react";
import HeatMap from "react-heatmap-grid";

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

  return (
    <div
      style={{
        fontSize: "10px",
        margin: "0px auto",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
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
            value <= 30
              ? "#c2ffbe"
              : value <= 70
              ? "#4cff3f"
              : value > 70
              ? "rgb(0, 213, 0)"
              : null,
          fontSize: "1px",
          color: "gray",
          // height: "20em",
          // width: "30em",
          // margin: "0px",
        })}
        cellRender={(value) => value && <div>{value}%</div>}
      />
    </div>
  );
}
