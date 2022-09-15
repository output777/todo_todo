import React, { useState } from "react";
import { Row } from "react-bootstrap";
import styled from "styled-components";
import info from "../../assets/img/mainpage/info.svg";
import BarChart from "./BarChart";
import HeatmapSample from "./HeatmapSample";
import LineChart from "./LineChart";
import Modal from "../utils/Modal";
import trophy from "../../assets/img/mainpage/trophy.svg";

const Statistics = () => {
  const [modalView, setModalView] = useState(false);
  const [modal, setModal] = useState(null);

  const modalToggleHandler = (parameter) => {
    setModalView(!modalView);
    setModal(parameter);
  };
  return (
    <>
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
          height={modal === "score" ? "22em" : "19em"}
          radius="48px"
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
                  <span>
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
                <span>
                  <img src={trophy} />
                  주간 랭킹 점수란?
                </span>
                <div>아래 그래프는 이번 주 요일별 점수 추이를 보여줍니다.</div>
              </StModalExplainTop>
            ) : (
              <StModalExplainTop>
                <span>
                  <img src={trophy} />
                  히트맵 이란?
                </span>
                <div>
                  히트맵은 주차별(가로축), 요일별(세로축) 달성률에 따라 색깔의
                  옅고 진함을 표시합니다.
                </div>
              </StModalExplainTop>
            )}
            <StModalCloseDiv onClick={modalToggleHandler}>닫기</StModalCloseDiv>
          </StModalBottom>
        </Modal>
      )}
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
  justify-content: center;
  width: 90%;
  margin: 5% auto;
  height: 12vh;
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
const StModalExplainTop = styled.div`
  span {
    margin-top: 8%;
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
