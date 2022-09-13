import React from "react";
import { Row } from "react-bootstrap";
import styled from "styled-components";
import info from "../../assets/img/mainpage/info.svg";

const Statistics = () => {
  return (
    <>
      <h3 style={{ fontSize: "23px", fontWeight: "bold", margin: "2%" }}>
        통계
      </h3>
      <StLine></StLine>
      <StBackground>
        <StTopSubjectDiv>
          <div>나의 점수</div>
          <img src={info} />
        </StTopSubjectDiv>
        <div style={{ display: "flex", flexDirection: "row", gap: "3%" }}>
          <StScoreBoxDiv></StScoreBoxDiv>
          <StScoreBoxDiv></StScoreBoxDiv>
        </div>
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
  height: 100vh;
`;

const StTopSubjectDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2%;
  padding: 2%;
  div {
    font-size: 1.3em;
    font-weight: bold;
  }
`;

const StScoreBoxDiv = styled.div`
  width: 155px;
  height: 90px;
  background: #ffffff;

  box-shadow: 0px 4px 15px rgba(17, 17, 17, 0.05);
  border-radius: 12px;
`;
