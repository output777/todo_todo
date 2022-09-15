import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  __getTodo,
  __postTodo,
  __completeTodo,
  __deleteTodo,
  __updateTodo,
} from "../../redux/modules/plannerSlice";

import styled from "styled-components";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import doneSvg from "../../assets/img/doneSvg.svg";
import notDoneSvg from "../../assets/img/notDoneSvg.svg";
import threeDotDoneSvg from "../../assets/img/threeDotDoneSvg.svg";
import threeDotSvg from "../../assets/img/threeDotSvg.svg";
import PlusButton from "../utils/PlusButton";
import Modal from "../utils/Modal";
import PlannerCalender from "./PlannerCalender";

const Planner = () => {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState({
    content: "",
    isComplete: false,
  });

  const [input, setInput] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { todos } = useSelector((state) => state.planner);
  console.log("todos", todos, todos.length);

  const todoInputRef = useRef([]);
  const todoContentRef = useRef([]);
  const todoButtonRef = useRef([]);
  todoInputRef.current = [];
  todoContentRef.current = [];
  todoButtonRef.current = [];

  console.log("todoInputRef", todoInputRef);
  console.log("todoContentRef", todoContentRef);

  const onChangeHandler = useCallback((e) => {
    const { value } = e.target;
    setTodo({
      ...todo,
      content: value,
    });
  }, []);

  const onSubmitHandler = useCallback(() => {
    dispatch(__postTodo(todo));

    setTodo({
      ...todo,
      content: "",
      isComplete: false,
    });
  }, [todo]);

  const onInputHandler = useCallback(() => {
    if (!input) {
      setInput(true);
    } else {
      setInput(false);
    }
  }, [input]);

  const onCompleteHandler = useCallback(
    (todo) => {
      dispatch(
        __completeTodo({
          ...todo,
          isComplete: !todo.complete,
        })
      );
    },
    [todo]
  );

  const onEditHandler = () => {
    console.log("todoInputRef", todoInputRef, todoInputRef.current);
    console.log("todoContentRef", todoContentRef, todoContentRef.current);

    let index = localStorage.getItem("index");
    todoInputRef.current[index].classList.add("show");
    todoButtonRef.current[index].classList.add("show");
    todoContentRef.current[index].classList.remove("show");

    closeModal();
  };

  const onEditSubmitHandler = useCallback(
    (props) => {
      dispatch(
        __updateTodo({
          ...props,
          isComplete: props.complete,
          content: todo.content,
        })
      );
      let index = localStorage.getItem("index");
      todoInputRef.current[index].classList.remove("show");
      todoButtonRef.current[index].classList.remove("show");
      todoContentRef.current[index].classList.add("show");
    },
    [todo]
  );

  const onEditCancleHandler = () => {
    let index = localStorage.getItem("index");
    todoInputRef.current[index].classList.remove("show");
    todoButtonRef.current[index].classList.remove("show");
    todoContentRef.current[index].classList.add("show");
  };

  const openModal = (e, index) => {
    // console.log(e, index);
    // console.log(e.target.id);
    setModalVisible(true);
    localStorage.setItem("todoId", e.target.id);
    localStorage.setItem("index", index);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const onDeleteHandler = () => {
    dispatch(__deleteTodo(localStorage.getItem("todoId")));
    closeModal();
  };

  const addTodoInputRefs = (el) => {
    if (el) {
      todoInputRef.current.push(el);
    }
  };

  const addTodoContentRefs = (el) => {
    if (el) {
      todoContentRef.current.push(el);
    }
  };

  const addTodoButtonRefs = (el) => {
    if (el) {
      todoButtonRef.current.push(el);
    }
  };

  useEffect(() => {
    dispatch(__getTodo());
    console.log("todos", todos, todos.length);
  }, [dispatch]);

  return (
    <StDiv>
      <PlannerCalender />
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
          {todos?.map((todo, index) =>
            todo.complete === false ? (
              <StTodoNotDone key={todo.todoId}>
                <StTodoLeft>
                  <img
                    src={notDoneSvg}
                    onClick={() => onCompleteHandler(todo)}
                    id={todo.todoId}
                  />
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      onEditSubmitHandler(todo);
                    }}
                  >
                    <StInput
                      ref={addTodoInputRefs}
                      onChange={onChangeHandler}
                      placeholder='Enter키로 입력'
                    />
                    <button
                      ref={addTodoButtonRefs}
                      type='button'
                      onClick={onEditCancleHandler}
                    >
                      취소
                    </button>
                    <span className='show' ref={addTodoContentRefs}>
                      {todo.content}
                    </span>
                  </form>
                </StTodoLeft>
                <StTodoRightImg
                  src={threeDotSvg}
                  onClick={(e) => openModal(e, index)}
                  id={todo.todoId}
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
                    <div onClick={onEditHandler}>수정</div>
                    <div onClick={onDeleteHandler}>삭제</div>
                  </Modal>
                )}
              </StTodoNotDone>
            ) : null
          )}
        </StNotDoneTodosDiv>
      )}
      <StDoneTodosDiv>
        {todos?.map((todo) =>
          todo.complete === true ? (
            <StTodoDone key={todo.todoId}>
              <StTodoLeft>
                <img
                  src={doneSvg}
                  onClick={() => onCompleteHandler(todo)}
                  id={todo.todoId}
                />
                <span className='show'>{todo.content}</span>
              </StTodoLeft>
              <StTodoRightImg src={threeDotDoneSvg} />
            </StTodoDone>
          ) : null
        )}
      </StDoneTodosDiv>
      <PlusButton onClick={onInputHandler} />
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

  & input {
    display: none;
  }

  & input.show {
    display: inline-block;
  }

  & span {
    display: none;
  }

  & span.show {
    display: block;
  }
  & button {
    display: none;
  }

  & button.show {
    display: inline-block;
    margin-left: 10px;
  }
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

const StInput = styled.input`
  /* border: 0;
  outline: none; */
`;