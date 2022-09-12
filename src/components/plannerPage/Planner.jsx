import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  __getTodo,
  __postTodo,
  __completeTodo,
  __deleteTodo,
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
import Modal from "../utils/Modal";

const Planner = () => {
  const [todo, setTodo] = useState({
    content: "",
    isComplete: false,
  });

  const todos = useSelector((state) => state.planner.todos);
  console.log(todos);

  const [input, setInput] = useState(false);

  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    const { value } = e.target;
    setTodo({
      ...todo,
      content: value,
    });
  };

  const onSubmitHandler = () => {
    dispatch(__postTodo(todo));

    setTodo({
      ...todo,
      content: "",
      isComplete: false,
    });
  };

  const onInputHadnler = () => {
    if (input == false) {
      setInput(true);
    } else if (input == true) {
      setInput(false);
    }
  };

  const onCompleteHandler = (todo) => {
    {
      dispatch(
        __completeTodo({
          ...todo,
          isComplete: true,
        })
      );
    }
  };
  const onEditHadnler = () => {
    if (edit == false) {
      setEdit(true);
    }
  };

  console.log(edit);

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (e) => {
    console.log(e.target);
    console.log(e.target.id);
    setModalVisible(true);
    localStorage.setItem("todoId", e.target.id);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const A = (e) => {
    dispatch(__deleteTodo(localStorage.getItem("todoId")));
  };

  useEffect(() => {
    dispatch(__getTodo());
  }, [dispatch]);

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
          <ProgressBar now={50} variant='temp' />
        </StProgressBarDiv>
      </StAchievementRateDiv>

      <StInputContainer>
        {input ? (
          <StInputBox>
            <input onChange={onChangeHandler} />
            <button
              onClick={() => {
                onSubmitHandler(todo);
              }}
            >
              작성
            </button>
          </StInputBox>
        ) : null}
      </StInputContainer>

      {todos.length == 0 ? (
        <StNothingTodoNoticeDiv>
          <div>추가된 투두리스트가 없습니다!</div>
          <div>우측 하단에 있는 수정 버튼을 눌러</div>
          <div>투두리스트를 추가해주세요.</div>
        </StNothingTodoNoticeDiv>
      ) : (
        <StNotDoneTodosDiv>
          {todos?.map((todo) =>
            todo.isComplete === false ? (
              <StTodoNotDone key={todo.id}>
                <StTodoLeft>
                  <img
                    src={notDoneSvg}
                    onClick={() => onCompleteHandler(todo)}
                  />
                  <span>{todo.content}</span>
                </StTodoLeft>
                <StTodoRightImg
                  src={threeDotSvg}
                  onClick={openModal}
                  id={todo.id}
                />
                {modalVisible && (
                  <Modal
                    visible={modalVisible}
                    closable={true}
                    maskClosable={true}
                    onClose={closeModal}
                    width='150px'
                    height='100px'
                    backgroundcolor='rgba(0, 0, 0, 0.2)'
                  >
                    <div
                      onClick={() => {
                        closeModal();
                        onEditHadnler();
                      }}
                    >
                      수정
                    </div>
                    <div
                      onClick={() => {
                        closeModal();
                        A();
                      }}
                    >
                      삭제
                    </div>
                  </Modal>
                )}
              </StTodoNotDone>
            ) : null
          )}
        </StNotDoneTodosDiv>
      )}

      <StDoneTodosDiv>
        {todos?.map((todo) =>
          todo.isComplete === true ? (
            <StTodoDone key={todo.id}>
              <StTodoLeft>
                <img src={doneSvg} />
                <span>{todo.content}</span>
              </StTodoLeft>
              <StTodoRightImg src={threeDotDoneSvg} />
            </StTodoDone>
          ) : null
        )}
      </StDoneTodosDiv>
      <PlusButton onClick={onInputHadnler} />
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
  .bg-temp {
    background-color: #ffdb80;
    /* background-color: #74e272; */
    //background-color: #74e272;
  }
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

const StNotDoneTodosDiv = styled.div`
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StDoneTodosDiv = styled.div`
  margin-top: 10px;
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

const StInputBox = styled.div`
  padding-top: 20px;
`;

const StInputContainer = styled.div`
  height: 50px;
`;
