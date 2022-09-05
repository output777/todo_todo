import React from "react";
import styled from "styled-components";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import calendarSvg from "../../assets/img/calendarSvg.svg";
import DoneSvg from "../../assets/img/DoneSvg.svg";
import notDoneSvg from "../../assets/img/notDoneSvg.svg";

const Planner = () => {
  return (
    <div>
      <StDateDiv>
        <StSpan>9월 3일 목요일</StSpan>
        <img src={calendarSvg} />
      </StDateDiv>
      <StAchievementRateDiv>
        <StAMentionDiv>투두를 추가해주세요!</StAMentionDiv>
        {/* <StAMentionDiv>거의 다 왔어요!</StAMentionDiv> */}

        <StProgressBarDiv>
          <StDivInBox>오늘의 투두 달성률</StDivInBox>
          <StNumberDiv>
            <div>12/24</div>
            <div>{(12 / 24) * 100 + "%"}</div>
          </StNumberDiv>
          <ProgressBar now={50} variant="warning" />
        </StProgressBarDiv>
      </StAchievementRateDiv>
      <StNothingTodoNoticeDiv>
        <p>추가된 투두리스트가 없습니다!</p>
        <p>우측 하단에 있는 수정 버튼을 눌러</p>
        <p>투두리스트를 추가해주세요.</p>
      </StNothingTodoNoticeDiv>
      <StTodosDiv>
        <StTodoDone>
          <img src={DoneSvg}></img> 영어단어 100개 외우기
        </StTodoDone>
        <StTodoDone>
          <img src={notDoneSvg}></img> 영어단어 100개 외우기
        </StTodoDone>
      </StTodosDiv>
    </div>
  );
};

export default Planner;

const StDateDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;

  margin-left: 3%;
  padding: 10px;
`;

const StAchievementRateDiv = styled.div`
  position: relative;
  background-color: white;
  width: 93%;
  margin: auto;
  height: 150px;
  border-radius: 10px;
  box-shadow: 0px 4px 15px 0px lightgray;
  padding: 1%;
`;
const StAMentionDiv = styled.div`
  position: absolute;
  left: 60%;
  right: 1%;
  top: -10%;
  border-radius: 10px;
  background-color: #ffe9d4;
  color: #ff7b00;
  font-weight: bold;
  text-align: center;
  /* width: 100%; */
`;

const StNothingTodoNoticeDiv = styled.div`
  width: 60%;
  margin: 10% auto;
  text-align: center;
  color: grey;
`;

const StSpan = styled.span`
  font-weight: bold;
`;

const StDivInBox = styled.div`
  color: #9f9e9e;
`;

const StProgressBarDiv = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* border: 1px solid black; */
  margin: 20px auto;
`;

const StNumberDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  font-weight: bold;
`;

const StTodoDone = styled.div`
  border: 1px solid black;
  width: 90%;
  height: 40px;
  margin: auto;
  border-radius: 40px;
  border: #e8e8e8;
  background-color: rgba(255, 255, 255, 0.5);

  display: flex;
  align-items: center;
`;

const StTodosDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
