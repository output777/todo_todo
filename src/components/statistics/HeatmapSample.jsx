import React from "react";
import HeatMap from "react-heatmap-grid";

export default function () {
  const xLabels = new Array(7).fill(0).map((_, i) => `${i + 1}주차`);

  // Display only even labels
  const xLabelsVisibility = new Array(7).fill(0).map((_, i) => i + 1);

  const yLabels = ["일", "월", "화", "수", "목", "금", "토"];
  const data = new Array(yLabels.length)
    .fill(0)
    .map(() =>
      new Array(xLabels.length)
        .fill(0)
        .map(() => Math.floor(Math.random() * 100))
    );

  return (
    <div style={{ fontSize: "13px" }}>
      <HeatMap
        xLabels={xLabels}
        yLabels={yLabels}
        xLabelsLocation={"bottom"}
        xLabelsVisibility={xLabelsVisibility}
        xLabelWidth={60}
        data={data}
        squares
        height={45}
        cellStyle={(background, value, min, max, data, x, y) => ({
          background:
            value <= 30
              ? "#c2ffbe"
              : value <= 70
              ? "#4cff3f"
              : value > 70
              ? "rgb(0, 213, 0)"
              : null,
          fontSize: "12px",
          color: "#444",
        })}
        cellRender={(value) => value && <div>{value}%</div>}
      />
    </div>
  );
}
