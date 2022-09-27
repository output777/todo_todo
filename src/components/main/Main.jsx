import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import info from "../../assets/img/mainpage/info.svg";
import trophy from "../../assets/img/mainpage/trophy.svg";
import bigTrophy from "../../assets/img/mainpage/bigTrophy.svg";
import schoolSvg from "../../assets/img/mainpage/school.svg";
import Modal from "../utils/Modal";
import InfiniteScroll from "./InfiniteScroll";
import InfiniteScrollMonthly from "./InfiniteScrollMonthly";
import {
  __getDday,
  __getMainRank,
  __getThisMonthRate,
  __getTotalRate,
} from "../../redux/modules/mainSlice";
import { __getMyInfo } from "../../redux/modules/mySlice";
import InfiniteScrollSchoolRank from "./InfiniteScrollSchoolRank";
import Dday from "./Dday";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
// import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
SwiperCore.use([Navigation, Pagination]);

// 월간 랭킹, 주간 랭킹 부분을 클릭하면 렌더링이 일어남
// 월간 랭킹 리스트, 주간 랭킹 리스트를 보여줄 때 useState가 필요한지 확인
// 필요 없으면 useRef로 css 변경하려고 함

// 메인 전체 페이지 살짝 스크롤 되는거 수정해야함
const Main = () => {
  const dispatch = useDispatch();
  const { thisMonthRate, totalRate } = useSelector((state) => state.main);
  console.log("thisMonthRate", thisMonthRate, "totalRate", totalRate);
  const [month, setMonth] = useState(false);
  const [weekly, setWeekly] = useState(true);
  const [school, setSchool] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [day, setDay] = useState(true);

  const nickname = localStorage.getItem("nickname");
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const onClickWeekly = () => {
    setWeekly(true);
    setMonth(false);
    setSchool(false);
  };

  const onClickMonth = () => {
    setWeekly(false);
    setMonth(true);
    setSchool(false);
  };

  const onClickSchoolRank = () => {
    setWeekly(false);
    setMonth(false);
    setSchool(true);
  };

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    // 무한스크롤을 처음 로딩할 때 바로 불러오면 아래와 같은 에러가 발생
    // Objects are not valid as a React child (found: object with keys {message, name, code, config, request, response}). If you meant to render a collection of children, use an array instead.
    // 그래서 시간차를 줌
    // const weeklyTimer = setTimeout(() => {
    //   setWeekly(true)
    // }, 100)

    dispatch(__getMyInfo(nickname));
    dispatch(__getThisMonthRate());
    dispatch(__getTotalRate(nickname));

    // return () => {
    //   clearTimeout(weeklyTimer)
    // }
  }, []);

  return (
    <StMainContainer>
      <StPhrasesbox>
        <div className='mainTopSentenceBox'>
          <span>투두투두</span>
          <div className='mainTopSentence'>
            {nickname == null || nickname == "null" ? (
              "닉네임을 설정해주세요^^"
            ) : (
              <StPhrase>
                <div>{nickname}님,</div>
                <div>오늘 하루도 힘내세요!</div>
              </StPhrase>
            )}
          </div>
        </div>

        <div>
          <Dday />
        </div>
      </StPhrasesbox>
      <StAchievementsBox>
        <StAchievementsTopBox>
          <div>
            {nickname === null || nickname === "null"
              ? "닉네임이 미설정 상태입니다."
              : `${nickname}님의 업적`}
          </div>
        </StAchievementsTopBox>
        <StAchievementsBottomBox>
          <StthisMonthGauge thisMonthRate={thisMonthRate}>
            <StGaugeText>
              이번달 플래너 달성률
              <div>
                {thisMonthRate[0] === undefined ? 0 : thisMonthRate[0]} %
              </div>
            </StGaugeText>

            <StProgressBarBox>
              <StProgressBar
                width={thisMonthRate[0] === undefined ? 0 : thisMonthRate[0]}
              ></StProgressBar>
            </StProgressBarBox>
          </StthisMonthGauge>

          <StTotalGauge
            totalRate={totalRate[0] === undefined ? 0 : totalRate[0]}
          >
            <StGaugeText>
              플래너 총 달성률
              <div>{totalRate[0] === undefined ? 0 : totalRate[0]} %</div>
            </StGaugeText>

            <StProgressBarBox>
              <StProgressBar
                width={totalRate[0] === undefined ? 0 : totalRate[0]}
              ></StProgressBar>
            </StProgressBarBox>
          </StTotalGauge>
        </StAchievementsBottomBox>
      </StAchievementsBox>

      {/* -------------- 모달창 ---------------*/}
      {modalVisible && (
        <Modal
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
          width="80%"
          height="23rem"
          radius="48px"
          top="40%"
          backgroundcolor="rgba(17, 17, 17, 0.6)"
        >
          <StModalTop>
            <span>투두투두 랭킹 산정 방법</span>
          </StModalTop>
          <Swiper
            className="banner"
            spaceBetween={50}
            slidesPerView={1}
            // navigation
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <StModalBottom>
                <StModalExplainDiv>
                  <span>주간/월간 랭킹</span>
                  <img src={bigTrophy} />
                  <div>
                    주간 랭킹은 일주일/한달 간 측정한 투두 달성률 평균이 높은
                    순으로 순위가 결정됩니다.
                  </div>
                </StModalExplainDiv>
              </StModalBottom>
            </SwiperSlide>
            <SwiperSlide>
              <StModalBottom>
                <StModalExplainDiv>
                  <span>학교 랭킹</span>
                  <img src={schoolSvg} />
                  <div>
                    학교 랭킹은 같은 학교에 소속돼 있는 학생들의 한달 간 측정한
                    투두 달성률의 평균이 높은 순으로 순위가 결정됩니다.
                  </div>
                </StModalExplainDiv>
              </StModalBottom>
            </SwiperSlide>
          </Swiper>

          <StCloseBtnContainer>
            <StModalCloseBtn onClick={closeModal}>확인</StModalCloseBtn>
          </StCloseBtnContainer>
        </Modal>
      )}

      {/* -------------------- 랭킹 --------------------*/}
      <div className='rank'>
        <StRankingPhrases>
          <img src={trophy} />
          <span>랭킹</span>
          <img src={info} onClick={openModal} />
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
          {school ? (
            <StMonthRankingBtn onClick={onClickSchoolRank}>
              <span>학교 랭킹</span>
            </StMonthRankingBtn>
          ) : (
            <StMonthRankingBtn2nd onClick={onClickSchoolRank}>
              <span>학교 랭킹</span>
            </StMonthRankingBtn2nd>
          )}
        </StRankingBtnBox>

        {weekly ? <InfiniteScroll /> : null}
        {month ? <InfiniteScrollMonthly /> : null}
        {school ? <InfiniteScrollSchoolRank /> : null}
      </div>
    </StMainContainer>
  );
};

export default Main;

const StProgressBarBox = styled.div`
  width: 100%;
  height: 13px;
  border-radius: 10px;
  background-color: #ececec;
`;

const StProgressBar = styled.div`
  ${({ width }) => {
    console.log('width', width)
    if (width === 0) {
      return css`
        width: ${width}%;
        background-color: none;
      `;
    } else if (width < 33) {
      return css`
        width: ${width}%;
        background-color: #d34c4c;
      `;
    } else if (width < 66) {
      return css`
        width: ${width}%;
        background-color: #ffdb80;
      `;
    } else if (width <= 100) {
      return css`
        width: ${width}%;
        background-color: #74e272;
      `;
    }
  }};
  transition: all 0.3s;
  height: 13px;
  border-radius: 10px;
`;

const StMainContainer = styled.div`
  background-color: #fafafa;
  height: 95vh;
  font-family: "SUIT-Regular", sans-serif;
`;

const StPhrasesbox = styled.div`
  height: 10vh;
  width: 90%;
  margin: auto;
  padding-top: 3%;
  display: flex;
  align-items: flex-start;
  span {
    color: #ff7b00;
    font-weight: bold;
    font-size: 1rem;
  }
  .mainTopSentenceBox {
    margin-top: 0.7em;
  }
  .mainTopSentence {
    margin-top: 0.3em;
    font-weight: bold;
    font-size: 1rem;
  }
  .DdayBox {
    margin-top: 0.7em;
    height: 80%;
    width: 25%;
    background-color: white;
    box-shadow: 0px 4px 15px rgba(17, 17, 17, 0.05);
    border-radius: 20px;
    font-weight: bold;
    color: #ff7b00;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StPhrase = styled.div`
  font-size: 20px;
`;

const StAchievementsBox = styled.div`
  width: 90%;
  margin: 12% auto 5% auto;
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
  font-weight: 700;
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
  font-weight: 600;
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
  span {
    margin-left: 7px;
    margin-right: 7px;
    font-weight: 600;
    font-size: 20px;
    background-color: #fafafa;
  }
  img {
    margin-bottom: 7px;
    background-color: #fafafa;
  }
  position: sticky;
  top: 0;
  background-color: #fafafa;
  padding: 1em 0 0 1.5em;
`;

const StRankingBtnBox = styled.div`
  font-weight: 600;
  background-color: #fafafa;
  padding: 0.1em 0em 1em 1.5em;
  position: sticky;
  top: 2.6em;
`;

const StWeeklyRankingBtn = styled.button`
  width: 77px;
  height: 40px;
  background: #ff8f27;
  border: 1px solid #ff8f27;
  border-radius: 44px;
  span {
    color: white;
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
const StMonthRankingBtn = styled.button`
  width: 77px;
  height: 40px;
  margin: 10px 0 0 2%;
  background: #ff8f27;
  border: 1px solid #ff8f27;
  border-radius: 44px;
  span {
    color: white;
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
  width: 100%;
  height: 85px;
  border-radius: 48px 48px 0 0;
  background-color: #ffe9d5;
  color: #ff7b00;
  font-weight: bold;
  font-size: 1.2em;
`;

const StModalBottom = styled.div`
  width: 90%;
  height: 16rem;
  margin: 5% 0 0 5%;
  span {
    font-size: 1rem;
  }
`;
const StModalExplainDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  span {
    font-weight: bold;
  }

  div {
    width: 80%;
    text-align: center;
  }
`;

const StCloseBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 6rem;
`;

const StModalCloseBtn = styled.button`
  display: flex;
  justify-content: center;
  width: 93px;
  border: none;
  background-color: transparent;
  color: #ffffff;
  font-size: 1.2rem;
  padding: 1em;
`;

const StScrollDiv = styled.div`
  background-color: #fafafa;
  height: 40%;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 10px;
    height: 150px;
    border-radius: 0px;
    background: rgba(255, 255, 255, 0.4);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #d1d1d1;
  }
`;
