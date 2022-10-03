import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import info from "../../assets/img/mainpage/info.svg";
import BarChart from "./BarChart";
import HeatmapSample from "./HeatmapSample";
import LineChart from "./LineChart";
import Modal from "../utils/Modal";
import trophy from "../../assets/img/mainpage/trophy.svg";
import {
  __getRankScoreData,
  __getLineChartData,
} from "../../redux/modules/statisticsSlice";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Statistics = () => {
  const nickname = localStorage.getItem("nickname");

  const dispatch = useDispatch();
  const [modalView, setModalView] = useState(false);
  const [modal, setModal] = useState(null);
  const [month, setMonth] = useState(null);

  const { rankScoreData } = useSelector((state) => state.statistics);
  console.log("rankScoreData", rankScoreData);
  const modalToggleHandler = (parameter) => {
    setModalView(!modalView);
    setModal(parameter);
  };

  // ----------------- 점수 소수점 반올림 -------------------
  // let lastweekScore = Math.round(rankScoreData[0].score);
  // let lastweekScore2 = isNaN(lastweekScore)
  //   ? 0
  //   : Math.round(rankScoreData[0].score);

  let weeklyScore = rankScoreData[1].score / 7;
  console.log(weeklyScore);
  let weeklyScore2 = isNaN(weeklyScore) ? 0 : weeklyScore.toFixed(2);

  let monthlyScore =
    month !== null
      ? (rankScoreData[2].score / month) * 10
      : rankScoreData[2].score;
  let monthlyScore2 = isNaN(monthlyScore) ? 0 : monthlyScore.toFixed(2);

  let weeklyRank =
    rankScoreData[1].ranking === 0 || "null" ? "-" : rankScoreData[1].ranking;
  // console.log(weeklyRank.ranking);
  let monthlyRank =
    rankScoreData[2].ranking === 0 || "null" ? "-" : rankScoreData[2].ranking;

  const monthFunc = async () => {
    const { data } = await axios.get(`${BASE_URL}/month`);
    console.log("data", data);
    setMonth(() => data);
  };

  useEffect(() => {
    monthFunc();
  }, []);

  useEffect(() => {
    dispatch(__getRankScoreData(nickname));
  }, []);

  return (
    <StContainer>
      <StHeader>
        <span style={{ fontSize: "22px", fontWeight: "bold", margin: "5% 7%" }}>
          통계
        </span>
      </StHeader>
      <StBackground>
        <StTopSubjectDiv>
          <div>나의 점수</div>
          <img
            src={info}
            onClick={() => modalToggleHandler("score")}
            alt='infoImg'
          />
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
            <span className='lastweek'>저번주 </span>
            <span className='thisweek'> 이번주</span> <br />
            주간 랭킹 점수 변화
          </div>

          <BarChart />
        </StScoreChangeBoxDiv>
        <StTopSubjectDiv>
          <div>주간 랭킹 점수</div>
          <img
            src={info}
            onClick={() => modalToggleHandler("rank")}
            alt='infoImg'
          />
        </StTopSubjectDiv>
        <LineChart />
        <StTopSubjectDiv>
          <div>나의 투두 달성률</div>
          <img
            src={info}
            onClick={() => modalToggleHandler("heatMap")}
            alt='infoImg'
          />
        </StTopSubjectDiv>
        <div style={{ paddingBottom: "80px" }}>
          <HeatmapSample />
        </div>
      </StBackground>

      {/* ------------------- 모달창 ------------------ */}
      {modalView && (
        <Modal
          visible={modalView}
          closable={true}
          maskClosable={true}
          onClose={modalToggleHandler}
          width='350px'
          height={
            modal === "score" ? "22em" : modal === "rank" ? "20em" : "21em"
          }
          radius='48px'
          top='40%'
          backgroundcolor='#11111180 '
        >
          <StModalTop>
            {modal === "score" ? (
              <span>나의 점수</span>
            ) : modal === "rank" ? (
              <span>주간 랭킹 점수</span>
            ) : (
              <span>나의 투두 달성률</span>
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
                    <img src={trophy} alt='trophyImg' /> 주간점수
                  </span>
                  <div>
                    이번주에 쌓은 점수입니다.
                    <br />
                    (이번주 플래너 수 * 플래너별 달성률)
                  </div>
                </StModalExplainTop>
                <StModalExplainBottom>
                  <span>
                    <img src={trophy} alt='trophyImg' /> 월간 점수
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
                  {/* <img src={trophy} /> */}
                  주간 랭킹 점수란?
                </span>
                <div style={{ marginTop: "3%" }}>
                  아래 그래프는 매주 요일별 누적 점수 추이를 보여줍니다.
                  {/* <span style={{ color: "#D34C4C", fontWeight: "bold" }}>
                    {" "}
                    붉은색
                  </span>
                  은 상위랭커, */}
                  <div style={{ marginTop: "10px", width: "360px" }}>
                    <span style={{ color: "#618AF2", fontWeight: "bold" }}>
                      파란색
                    </span>
                    선은 유저님의 이번주 점수 추이입니다.
                  </div>
                </div>
              </StModalExplainTop>
            ) : (
              <StModalExplainTop>
                <StTemp>
                  <span>낮음</span>
                  <div style={{ backgroundColor: "#F3F3F3" }}></div>
                  <div style={{ backgroundColor: "#FF8F2740" }}></div>
                  <div style={{ backgroundColor: "#FF8F2780" }}></div>
                  <div style={{ backgroundColor: "#FF8F27" }}></div>
                  <span>높음</span>
                </StTemp>

                <div>
                  <div> 나의 투두 달성률은 주차별(가로축), </div>
                  요일별(세로축) 달성률에 따라 색깔의 옅고 진함을 표시합니다.
                  <div
                    style={{
                      marginTop: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    달성률이 높을 수록 색깔이 진해집니다.
                  </div>
                </div>
              </StModalExplainTop>
            )}
            <StModalCloseDiv onClick={modalToggleHandler}>닫기</StModalCloseDiv>
          </StModalBottom>
        </Modal>
      )}
    </StContainer>
  );
};
export default Statistics;

const StContainer = styled.div`
  font-family: "SUIT-Regular", sans-serif;
  height: 100%;
  overflow: hidden auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StHeader = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 1;
  border-bottom: 1px solid #f1f3f5;
`;

const StTemp = styled.div`
  width: 100%;
  height: 80px;
  margin: 2% auto;
  /* background-color: gray; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  div {
    width: 25px;
    height: 25px;
    border-radius: 4px;
    /* background-color: #c2ffbe; */
  }
  span {
    font-weight: 700;
    font-size: 15px;
  }
`;
const StLine = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: #f1f3f5;
`;

const StBackground = styled.div`
  background-color: #fafafa;
  margin-top: 10px;
  /* overflow-y:scroll;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  } */
  /* background-color: gray; */
  /* height: auto;
  min-height:100vh; */
`;

const StTopSubjectDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2%;
  margin: 0 0 3% 8%;
  padding-top: 20px;
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
  margin: 5% auto 0 auto;
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
    margin-top: 5%;
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
