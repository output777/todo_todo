import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import info from "../../assets/img/mainpage/info.svg";
import BarChart from "./BarChart";
import HeatmapSample from "./HeatmapSample";
import LineChart from "./LineChart";
import Modal from "../utils/Modal";
import trophy from "../../assets/img/mainpage/trophy.svg";
import { __getRankScoreData } from "../../redux/modules/statisticsSlice";

const Statistics = () => {
  const [modalView, setModalView] = useState(false);
  const [modal, setModal] = useState(null);
  const dispatch = useDispatch();
  const { rankScoreData } = useSelector((state) => state.statistics);
  console.log("rankScoreData", rankScoreData);
  const modalToggleHandler = (parameter) => {
    setModalView(!modalView);
    setModal(parameter);
  };

  // ----------------- 점수 소수점 반올림 -------------------
  let lastweekScore = Math.round(rankScoreData[0].score);
  let lastweekScore2 = isNaN(lastweekScore)
    ? Math.round(rankScoreData[0].score)
    : 0;

  let weeklyScore = Math.round(rankScoreData[1].score);
  let weeklyScore2 = isNaN(weeklyScore)
    ? 0
    : Math.round(rankScoreData[1].score);

  let monthlyScore = Math.round(rankScoreData[2].score);
  let monthlyScore2 = isNaN(monthlyScore)
    ? 0
    : Math.round(rankScoreData[2].score);

  let weeklyRank =
    rankScoreData[1].ranking === undefined ? "-" : rankScoreData[1].ranking;

  let monthlyRank =
    rankScoreData[2].ranking === undefined ? "-" : rankScoreData[2].ranking;

  useEffect(() => {
    dispatch(__getRankScoreData());
  }, []);

  return (
    <div style={{ fontFamily: 'SUIT-Regular, sans-serif' }}>
      <h3 style={{ fontSize: "22px", fontWeight: "bold", margin: "5% 7%" }}>
        통계
      </h3>
      <StBackground>
        <StLine></StLine>
        <StTopSubjectDiv>
          <div>나의 점수</div>
          <img src={info} onClick={() => modalToggleHandler("score")} />
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
              {weeklyScore2}점 / <span>{weeklyRank} 위</span>
            </div>
          </StScoreBoxDiv>
          <StScoreBoxDiv>
            <div>월간점수</div>
            <div>
              {monthlyScore2}점 / <span>{monthlyRank} 위</span>
            </div>
          </StScoreBoxDiv>
        </div>
        <StScoreChangeBoxDiv>
          <div>
            <span className="lastweek">저번주 </span>
            <span className="thisweek"> 이번주</span> <br />
            주간 랭킹 점수 변화
          </div>

          <BarChart />
        </StScoreChangeBoxDiv>
        <StTopSubjectDiv>
          <div>주간 랭킹 점수</div>
          <img src={info} onClick={() => modalToggleHandler("rank")} />
        </StTopSubjectDiv>
        <LineChart />
        <StTopSubjectDiv>
          <div>히트맵</div>
          <img src={info} onClick={() => modalToggleHandler("heatMap")} />
        </StTopSubjectDiv>
        <HeatmapSample />
      </StBackground>

      {/* ------------------- 모달창 ------------------ */}
      {modalView && (
        <Modal
          visible={modalView}
          closable={true}
          maskClosable={true}
          onClose={modalToggleHandler}
          width="350px"
          height={
            modal === "score" ? "22em" : modal === "rank" ? "20em" : "21em"
          }
          radius="48px"
          top="40%"
          backgroundcolor="#46464624"
        >
          <StModalTop>
            {modal === "score" ? (
              <span>나의 점수</span>
            ) : modal === "rank" ? (
              <span>주간 랭킹 점수</span>
            ) : (
              <span>히트맵</span>
            )}
          </StModalTop>

          <StModalBottom>
            {modal === "score" ? (
              <>
                <StModalExplainTop>
                  <span
                    style={{
                      margin: "8% 0 5% 0",
                      fontWeight: "bold",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "3%",
                    }}
                  >
                    <img src={trophy} /> 주간점수
                  </span>
                  <div>
                    이번주에 쌓은 점수입니다.
                    <br />
                    (이번주 플래너 수 * 플래너별 달성률)
                  </div>
                </StModalExplainTop>
                <StModalExplainBottom>
                  <span>
                    <img src={trophy} /> 월간 점수
                  </span>
                  <div>
                    이번 달에 쌓은 점수입니다.
                    <br />
                    (이번 달 플래너 수 * 플래너별 달성률)
                  </div>
                </StModalExplainBottom>
              </>
            ) : modal === "rank" ? (
              <StModalExplainTop>
                <span
                  style={{
                    marginTop: "8%",
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "3%",
                  }}
                >
                  <img src={trophy} />
                  주간 랭킹 점수란?
                </span>
                <div style={{ marginTop: "3%" }}>
                  아래 그래프는 매주 요일별 누적 점수 추이를 보여줍니다.
                  <span style={{ color: "#D34C4C", fontWeight: "bold" }}>
                    {" "}
                    붉은색
                  </span>
                  은 상위랭커,
                  <span style={{ color: "#618AF2", fontWeight: "bold" }}>
                    파란색
                  </span>
                  은 유저님의 이번주 점수 추이입니다.
                </div>
              </StModalExplainTop>
            ) : (
              <StModalExplainTop>
                <span
                  style={{
                    margin: "3% 0 3% 0",
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "3%",
                  }}
                >
                  <img src={trophy} />
                  히트맵 이란?
                </span>
                <div>
                  히트맵은 주차별(가로축), 요일별(세로축) 달성률에 따라 색깔의
                  옅고 진함을 표시합니다. 달성률이 높을 수록 색깔이 진해집니다.
                </div>
                <StTemp>
                  <div style={{ backgroundColor: "#c2ffbe" }}></div>
                  <div style={{ backgroundColor: "#4cff3f" }}></div>
                  <div style={{ backgroundColor: "rgb(0, 213, 0)" }}></div>
                </StTemp>
              </StModalExplainTop>
            )}
            <StModalCloseDiv onClick={modalToggleHandler}>닫기</StModalCloseDiv>
          </StModalBottom>
        </Modal>
      )}
    </div>
  );
};
export default Statistics;

const StTemp = styled.div`
  width: 100%;
  height: 30%;
  margin: 1% auto;
  /* background-color: gray; */
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: center; */
  gap: 2%;
  div {
    width: 10%;
    height: 70%;
    /* background-color: #c2ffbe; */
    margin: 0;
  }
`;
const StLine = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: #ffe9d4;
`;

const StBackground = styled.div`
  background-color: #fafafa;
  /* background-color: gray; */
  height: 110vh;
`;

const StTopSubjectDiv = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2%;
  margin: 5% 0 3% 8%;
  div {
    font-size: 1em;
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
    font-size: 0.85em;
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
  justify-content: center;
  width: 90%;
  margin: 5% auto;
  height: 12vh;
  background: #ffffff;
  box-shadow: 0px 4px 15px rgba(17, 17, 17, 0.05);
  border-radius: 12px;

  div {
    width: 50%;
    font-size: 0.85em;
    font-weight: bold;
    margin-left: 7%;
  }

  .lastweek {
    color: #9f9e9e;
  }
  .thisweek {
    color: #9f9e9e;
  }
`;

// ----------- 모달 -------------

const StModalTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 85px;

  border-radius: 48px 48px 0 0;
  background-color: #ffe9d5;
  color: #ff7b00;
  font-weight: bold;
  font-size: 1.2em;
`;

const StModalBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 70%;
  width: 80%;
  margin: auto;
  gap: 1.3em;

  div {
  }
`;
const StModalExplainTop = styled.div``;

const StModalExplainBottom = styled.div`
  span {
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3%;
  }
  div {
    margin-top: 3%;
  }
`;

const StCloseBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StModalCloseDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 80%;
  height: 2em;
  margin: 0 auto;

  border: none;
  background-color: none;
  color: #ff8f27;
  font-weight: bold;
`;
