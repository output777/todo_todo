import React from "react";
import { Row } from "react-bootstrap";
import styled from "styled-components";
import info from "../../assets/img/mainpage/info.svg";
import BarChart from "./BarChart";
import HeatmapSample from "./HeatmapSample";
import LineChart from "./LineChart";

const Statistics = () => {
  return (
    <>
      <h3 style={{ fontSize: "22px", fontWeight: "bold", margin: "5% 7%" }}>
        통계
      </h3>
      <StBackground>
        <StLine></StLine>
        <StTopSubjectDiv>
          <div>나의 점수</div>
          <img src={info} />
        </StTopSubjectDiv>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            gap: "5%",
            width: "90%",
          }}
        >
          <StScoreBoxDiv>
            <div>주간점수</div>
            <div>
              100점 / <span>153위</span>
            </div>
          </StScoreBoxDiv>
          <StScoreBoxDiv>
            <div>월간점수</div>
            <div>
              100점 / <span>153위</span>
            </div>
          </StScoreBoxDiv>
        </div>
        <StScoreChangeBoxDiv>
          <div>
            저번주 이번주 <br />
            주간 랭킹 점수 변화
          </div>
          <BarChart />
        </StScoreChangeBoxDiv>
        <StTopSubjectDiv>
          <div>주간 랭킹 점수</div>
        </StTopSubjectDiv>
        <LineChart />
        <StTopSubjectDiv>
          <div>히트맵</div>
        </StTopSubjectDiv>
        <HeatmapSample />
      </StBackground>
    </>
  );
};
export default Statistics;

const StLine = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: #ffe9d4;
`;

const StBackground = styled.div`
  background-color: #fafafa;
  /* background-color: gray; */
  height: 90vh;
`;

const StTopSubjectDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2%;
  margin: 5% 0 3% 8%;
  div {
    font-size: 1.3em;
    font-weight: bold;
  }
`;

const StScoreBoxDiv = styled.div`
  width: 60%;
  height: 10vh;
  background: #ffffff;
  box-shadow: 0px 4px 15px rgba(17, 17, 17, 0.05);
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  div {
    margin: 1% 15%;
    font-size: 0.9em;
    font-weight: bold;
    & span {
      color: #ff7b00;
    }
  }
`;

const StScoreChangeBoxDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
  margin: 5% auto;
  height: 10vh;
  background: #ffffff;

  box-shadow: 0px 4px 15px rgba(17, 17, 17, 0.05);
  border-radius: 12px;
  div {
    width: 50%;
    font-size: 0.8em;
    font-weight: bold;
    margin-left: 7%;
  }
`;
