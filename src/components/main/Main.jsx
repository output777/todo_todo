import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import ProgressBar from "react-bootstrap/ProgressBar";
import info from "../../assets/img/mainpage/info.svg";
import trophy from "../../assets/img/mainpage/trophy.svg";
import Modal from "../utils/Modal";
import InfiniteScroll from "./InfiniteScroll";
import InfiniteScrollMonthly from "./InfiniteScrollMonthly";
import { __getAchievementRate } from "../../redux/modules/mainSlice";
import { __getMyInfo } from "../../redux/modules/mySlice";
// 월간 랭킹, 주간 랭킹 부분을 클릭하면 렌더링이 일어남
// 월간 랭킹 리스트, 주간 랭킹 리스트를 보여줄 때 useState가 필요한지 확인
// 필요 없으면 useRef로 css 변경하려고 함

// 메인 전체 페이지 살짝 스크롤 되는거 수정해야함
const Main = () => {
  const dispatch = useDispatch();
  const { achievementRate } = useSelector((state) => state.main);
  const [month, setMonth] = useState(false);
  const [weekly, setWeekly] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  // -------------------- 소수점 반올림 ---------------------
  let thisMonthRate = Math.round(achievementRate[0].achievementRate);
  let thisMonthRate2 = isNaN(thisMonthRate)
    ? 0
    : Math.round(achievementRate[0].achievementRate);

  let totalRate = Math.round(achievementRate[1].achievementRate);
  let totalRate2 = isNaN(totalRate)
    ? 0
    : Math.round(achievementRate[1].achievementRate);

  const nickname = localStorage.getItem("nickname");

  const onClickMonth = () => {
    setMonth(true);
    setWeekly(false);
  };

  const onClickWeekly = () => {
    setMonth(false);
    setWeekly(true);
  };

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };


  useEffect(() => {
    // dispatch(__getMyInfo());
    dispatch(__getAchievementRate());
  }, [dispatch]);

  return (
    <StMainContainer>
      <StPhrasesbox>
        <span>투두투두</span>
        <div>{nickname}님, 오늘 하루도 힘내세요!</div>
      </StPhrasesbox>
      <StAchievementsBox>
        <StAchievementsTopBox>
          <div>{nickname}님의 업적</div>
        </StAchievementsTopBox>
        <StAchievementsBottomBox>
          <StthisMonthGauge thisMonthRate={thisMonthRate}>
            <StGaugeText>
              이번달 플래너 달성률
              <div>{thisMonthRate2} %</div>
            </StGaugeText>
            <div>
              <ProgressBar now={thisMonthRate2} />
            </div>
          </StthisMonthGauge>

          <StTotalGauge totalRate={totalRate}>
            <StGaugeText>
              플래너 총 달성률
              <div>{totalRate2} %</div>
            </StGaugeText>
            <div>
              <ProgressBar now={totalRate2} />
            </div>
          </StTotalGauge>
        </StAchievementsBottomBox>
      </StAchievementsBox>
      <StRankingPhrases>
        <img src={trophy} />
        <span>랭킹</span>
        <img src={info} onClick={openModal} />

        {/* -------------- 모달창 ---------------*/}
        {modalVisible && (
          <Modal
            visible={modalVisible}
            closable={true}
            maskClosable={true}
            onClose={closeModal}
            width="350px"
            height="330px"
            radius="48px"
            top="40%"
            backgroundcolor="rgba(31, 31, 31, 0.116)"
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
        {weekly ? (
          <StWeeklyRankingBtn onClick={onClickWeekly}>
            <span>주간 랭킹</span>
          </StWeeklyRankingBtn>
        ) : (
          <StWeeklyRankingBtn2nd onClick={onClickWeekly}>
            <span>주간 랭킹</span>
          </StWeeklyRankingBtn2nd>
        )}
        {month ? (
          <StMonthRankingBtn onClick={onClickMonth}>
            <span>월간 랭킹</span>
          </StMonthRankingBtn>
        ) : (
          <StMonthRankingBtn2nd onClick={onClickMonth}>
            <span>월간 랭킹</span>
          </StMonthRankingBtn2nd>
        )}
      </StRankingBtnBox>
      <StScrollDiv>
        {weekly ? <InfiniteScroll /> : <InfiniteScrollMonthly />}
      </StScrollDiv>
    </StMainContainer>
  );
};

export default Main;

const StMainContainer = styled.div`
  background-color: #fafafa;
  height: 95vh;
  font-family: 'SUIT-Regular', sans-serif;
`;

const StPhrasesbox = styled.div`
  height: 10vh;
  width: 90%;
  margin: auto;
  padding-top: 3%;
  span {
    color: #ff7b00;
    font-weight: bold;
    font-size: 1rem;
  }
  div {
    margin-top: 5px;
    font-weight: bold;
    font-size: 1.2rem;
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
  font-weight:700;
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
  font-weight:600;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15%;
`;
const StthisMonthGauge = styled.div`
  width: 90%;
  .progress-bar {
    ${({ thisMonthRate }) => {
    if (thisMonthRate < 30) {
      return css`
          background-color: #d34c4c;
        `;
    }
    if (thisMonthRate >= 30 && thisMonthRate < 70) {
      return css`
          background-color: #ffdb80;
        `;
    }
    if (thisMonthRate >= 70) {
      return css`
          background-color: #74e272;
        `;
    }
  }}
  }
`;
const StTotalGauge = styled.div`
  width: 90%;
  .progress-bar {
    ${({ totalRate }) => {
    if (totalRate < 30) {
      return css`
          background-color: #d34c4c;
        `;
    }
    if (totalRate >= 30 && totalRate < 70) {
      return css`
          background-color: #ffdb80;
        `;
    }
    if (totalRate >= 70) {
      return css`
          background-color: #74e272;
        `;
    }
  }}
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
  margin: 0 0 1em 1.5em;
  font-weight: 600;
`;

const StMonthRankingBtn = styled.button`
  width: 77px;
  height: 40px;
  margin: 10px 0 0 2%;
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
  margin: 10px 0 0 2%;
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
  background-color: #ffe9d5;
  color: #ff7b00;
  font-weight: bold;
  font-size: 1.2em;
`;

const StModalBottom = styled.div`
  width: 90%;
  margin: 5% 0 0 5%;
  span {
    font-size:1rem;
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
  /* height: 40%; */
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
