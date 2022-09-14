import React, { useState } from "react";
import styled from "styled-components";
import ProgressBar from "react-bootstrap/ProgressBar";
import info from "../../assets/img/mainpage/info.svg";
import trophy from "../../assets/img/mainpage/trophy.svg";
import Modal from "../utils/Modal";
import InfiniteScroll from "./InfiniteScroll";

const Main = () => {
  const [month, setMonth] = useState(true);
  const [weekly, setWeekly] = useState(false);

  const onClickMonth = () => {
    setMonth(true);
    setWeekly(false);
  };

  const onClickWeekly = () => {
    setMonth(false);
    setWeekly(true);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <StMainContainer>
      <StPhrasesbox>
        <span>투두투두</span>
        <div>OO님, 오늘 하루도 힘내세요!</div>
      </StPhrasesbox>
      <StAchievementsBox>
        <StAchievementsTopBox>
          <div>OO님의 업적</div>
        </StAchievementsTopBox>
        <StAchievementsBottomBox>
          <StthisMonthGauge>
            <StGaugeText>
              이번달 플래너 달성률<div>80%</div>
            </StGaugeText>
            <div>
              <ProgressBar now={80} />
            </div>
          </StthisMonthGauge>

          <StTotalGauge>
            <StGaugeText>
              플래너 총 달성률<div>15%</div>
            </StGaugeText>
            <div>
              <ProgressBar now={20} />
            </div>
          </StTotalGauge>
        </StAchievementsBottomBox>
      </StAchievementsBox>
      <StRankingPhrases>
        <img src={trophy} />
        <span>랭킹</span>
        <img src={info} onClick={openModal} />
        {modalVisible && (
          <Modal
            visible={modalVisible}
            closable={true}
            maskClosable={true}
            onClose={closeModal}
            width="350px"
            height="330px"
            radius="48px"
          >
            <StModalTop>
              <span>랭킹 시스템이란?</span>
            </StModalTop>

            <StModalBottom>
              <StModalExplainTop>
                <img src={trophy} />
                <span>실시간 랭킹</span>
                <div>
                  실시간 랭킹은 매달 며칠에 실시간 랭킹은 매달 며칠에 실시간
                  랭킹은 매달 며칠에
                </div>
              </StModalExplainTop>

              <StModalExplainBottom>
                <img src={trophy} />
                <span>주간 랭킹</span>
              </StModalExplainBottom>
              <div>
                실시간 랭킹은 매달 며칠에 실시간 랭킹은 매달 며칠에 실시간
                랭킹은 매달 며칠에
              </div>

              <StCloseBtnContainer>
                <StModalCloseBtn onClick={closeModal}>닫기</StModalCloseBtn>
              </StCloseBtnContainer>
            </StModalBottom>
          </Modal>
        )}
      </StRankingPhrases>
      <StRankingBtnBox>
        {month ? (
          <StMonthRankingBtn onClick={onClickMonth}>
            <span>월간 랭킹</span>
          </StMonthRankingBtn>
        ) : (
          <StMonthRankingBtn2nd onClick={onClickMonth}>
            <span>월간 랭킹</span>
          </StMonthRankingBtn2nd>
        )}

        {weekly ? (
          <StWeeklyRankingBtn onClick={onClickWeekly}>
            <span>주간 랭킹</span>
          </StWeeklyRankingBtn>
        ) : (
          <StWeeklyRankingBtn2nd onClick={onClickWeekly}>
            <span>주간 랭킹</span>
          </StWeeklyRankingBtn2nd>
        )}
      </StRankingBtnBox>
      <StScrollDiv>
        <InfiniteScroll />
      </StScrollDiv>
    </StMainContainer>
  );
};

export default Main;

const StMainContainer = styled.div`
  background-color: #fafafa;
  height: 100%;
`;

const StPhrasesbox = styled.div`
  height: 10vh;
  width: 90%;
  margin: auto;
  padding-top: 3%;
  span {
    color: #ff7b00;
    font-weight: bold;
    font-size: 100%;
  }
  div {
    margin-top: 5px;
    font-weight: bold;
    font-size: 95%;
  }
`;

const StAchievementsBox = styled.div`
  width: 90%;
  margin: 5% auto;
  height: 13em;
  box-shadow: 0px 4px 15px 0px rgba(17, 17, 17, 0.05);
  border-radius: 16px;
  background-color: white;
`;

const StAchievementsTopBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 25%;

  border-radius: 12px 12px 0 0;
  background-color: #ffe9d5;
  div {
    margin-left: 15px;
    color: #ff7b00;
  }
`;

const StAchievementsBottomBox = styled.div`
  height: 75%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15%;
`;
const StthisMonthGauge = styled.div`
  width: 90%;
  .progress-bar {
    background-color: #74e272;
  }
`;
const StTotalGauge = styled.div`
  width: 90%;
  .progress-bar {
    background-color: #ffdb80;
  }
`;

const StGaugeText = styled.div`
  margin-bottom: 2%;
  display: flex;
  justify-content: space-between;
`;

const StRankingPhrases = styled.div`
  margin: 0 0 0 1.5em;
  span {
    margin-left: 7px;
    margin-right: 7px;
    font-weight: 600;
    font-size: 20px;
  }
  img {
    margin-bottom: 7px;
  }
`;

const StRankingBtnBox = styled.div`
  margin-left: 1.5em;
  margin-bottom: 1em;
`;

const StMonthRankingBtn = styled.button`
  width: 77px;
  height: 40px;

  margin-top: 10px;

  background: #ffe9d5;

  border: 1px solid #ff8f27;
  border-radius: 44px;

  span {
    color: #ff7b00;
    font-size: 14px;
  }
`;

const StMonthRankingBtn2nd = styled.button`
  width: 77px;
  height: 40px;
  margin-top: 10px;

  background: #ffffff;

  border: 1px solid #d7d5d5;
  border-radius: 44px;

  span {
    color: #9f9e9e;
    font-size: 14px;
  }
`;

const StWeeklyRankingBtn = styled.button`
  width: 77px;
  height: 40px;

  margin-left: 10px;

  background: #ffe9d5;

  border: 1px solid #ff8f27;
  border-radius: 44px;

  span {
    color: #ff7b00;
    font-size: 14px;
  }
`;

const StWeeklyRankingBtn2nd = styled.button`
  width: 77px;
  height: 40px;

  margin-left: 10px;

  background: #ffffff;

  border: 1px solid #d7d5d5;
  border-radius: 44px;

  span {
    color: #9f9e9e;
    font-size: 14px;
  }
`;

const StModalTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 85px;

  border-radius: 48px 48px 0 0;
  background-color: #f8f8f8;
`;

const StModalBottom = styled.div`
  width: 90%;
  margin: 5% 0 0 5%;
  span {
    color: #ff7b00;
  }
`;
const StModalExplainTop = styled.div``;

const StModalExplainBottom = styled.div`
  margin-top: 5%;
`;

const StCloseBtnContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StModalCloseBtn = styled.button`
  display: flex;
  justify-content: center;

  width: 93px;
  border: none;
  background-color: white;
  color: #ff8f27;

  margin-top: 5%;
`;

const StScrollDiv = styled.div`
  background-color: #fafafa;
  height: 20vh;
  /* overflow: scroll; */
  /* ::-webkit-scrollbar {
    width: 10px;
    height: 150px;
    border-radius: 0px;
    background: rgba(255, 255, 255, 0.4);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #d1d1d1;
  } */
`;
