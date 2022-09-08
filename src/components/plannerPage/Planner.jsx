import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  __getTodos,
  __postTodos,
  __updateTodos,
  __deleteTodos,
} from "../../redux/modules/plannerSlice";

import styled from "styled-components";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import calendarSvg from "../../assets/img/calendarSvg.svg";
import doneSvg from "../../assets/img/doneSvg.svg";
import notDoneSvg from "../../assets/img/notDoneSvg.svg";
import threeDotDoneSvg from "../../assets/img/threeDotDoneSvg.svg";
import threeDotSvg from "../../assets/img/threeDotSvg.svg";
import PlusButton from "../utils/PlusButton";

const Planner = () => {
  const [todo, setTodo] = useState([]);
  const [content, setContent] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);

  const onSubmitHandler = (todo) => {
    setTodo([...todo, { id: todo.length + 1, content: content }]);
  };
  console.log(todo);
  console.log(content);
  return (
    <StDiv>
      <StDateDiv>
        <StSpan>9월 3일 목요일</StSpan>
        <img src={calendarSvg} />
      </StDateDiv>
      <StAchievementRateDiv>
        {/* <StAMentionDiv>투두를 추가해주세요!</StAMentionDiv> */}
        <StAMentionDiv>거의 다 왔어요!</StAMentionDiv>

        <StProgressBarDiv>
          <StDivInBox>오늘의 투두 달성률</StDivInBox>
          <StNumberDiv>
            <div>12/24</div>
            <div>{(12 / 24) * 100 + "%"}</div>
          </StNumberDiv>
          {/* variant = "warning", "danger", "success" ,"info" */}
          <ProgressBar now={50} variant='warning' />
        </StProgressBarDiv>
      </StAchievementRateDiv>
      <StNothingTodoNoticeDiv>
        <div>추가된 투두리스트가 없습니다!</div>
        <div>우측 하단에 있는 수정 버튼을 눌러</div>
        <div>투두리스트를 추가해주세요.</div>
      </StNothingTodoNoticeDiv>
      <StTodosDiv>
        <div>
          {todo?.map((todo) => (
            <div key={todo.id}>
              <StTodoNotDone>
                <StTodoLeft>
                  <img src={notDoneSvg} />{" "}
                  <input
                    onChange={(event) => {
                      setContent(event.target.value);
                    }}
                  />
                </StTodoLeft>
                <button
                  onClick={() => {
                    dispatch(__postTodos(content));
                  }}
                >
                  작성
                </button>
                <StTodoRightImg src={threeDotSvg} />
              </StTodoNotDone>
            </div>
          ))}
        </div>

        <StTodoDone>
          <StTodoLeft>
            <img src={doneSvg}></img> <span>영어단어 100개 외우기</span>
          </StTodoLeft>
          <StTodoRightImg src={threeDotDoneSvg} />
        </StTodoDone>
      </StTodosDiv>
      <button
        onClick={() => {
          onSubmitHandler(todo);
        }}
      />
    </StDiv>
  );
};

export default Planner;

const StDiv = styled.div`
  position: static;
  z-index: -1;
  background-color: #fafafa;
  padding-bottom: 100%;
`;
const StDateDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;

  margin-left: 3%;
  padding: 10px;
  font-size: 18px;
`;

const StAchievementRateDiv = styled.div`
  position: relative;
  background-color: white;
  width: 93%;
  margin: auto;
  height: 150px;
  border-radius: 16px;
  box-shadow: 0px 4px 15px 0px lightgray;
  padding: 1%;
`;
const StAMentionDiv = styled.div`
  position: absolute;
  left: 60%;
  right: 1%;
  top: -10%;
  border-radius: 20px;
  background-color: #ffe9d4;
  color: #ff7b00;
  font-weight: bold;
  text-align: center;
  /* width: 105px; */
  height: 20%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StNothingTodoNoticeDiv = styled.div`
  width: 60%;
  margin: 10% auto;
  text-align: center;
  color: #9f9e9e;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 15px;
`;

const StSpan = styled.span`
  font-weight: bold;
`;

const StDivInBox = styled.div`
  color: #9f9e9e;
  font-weight: bold;
  font-size: 18px;
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
  /* font-size: 1.2em; */
  font-size: 20px;
`;

const StTodoDone = styled.div`
  width: 90%;
  height: 52px;
  margin: auto;
  border-radius: 40px;
  border: 2px solid #efefef;
  background-color: #fafafa;
  color: #d7d5d5;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StTodoNotDone = styled.div`
  width: 90%;
  height: 52px;
  margin: auto;
  border-radius: 40px;
  border: 2px solid #efefef;
  background-color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StTodosDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StTodoLeft = styled.div`
  margin-left: 2%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-weight: bold;
`;
const StTodoRightImg = styled.img`
  margin-right: 2%;
`;
