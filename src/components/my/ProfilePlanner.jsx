import React, { useEffect } from "react";
import MypageCalender from "./MypageCalender";
import { useDispatch, useSelector } from "react-redux";
import { __getTodo } from "../../redux/modules/plannerSlice";
import doneSvg from "../../assets/img/doneSvg.svg";
import notDoneSvg from "../../assets/img/notDoneSvg.svg";
import styled from "styled-components";

const ProfilePlanner = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getTodo());
  }, [dispatch]);

  const { todos } = useSelector((state) => state.planner);

  return (
    <StDiv>
      <MypageCalender />
      {todos.length == 0 ? (
        <StNothingTodoNoticeDiv>
          <div>추가된 투두리스트가 없습니다!</div>
        </StNothingTodoNoticeDiv>
      ) : (
        <StNotDoneTodosDiv>
          {todos?.map((todo) =>
            todo.complete === false ? (
              <StTodoNotDone key={todo.todoId}>
                <StTodoLeft>
                  <img src={notDoneSvg} id={todo.todoId} />

                  <span>{todo.content}</span>
                </StTodoLeft>
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
                <img src={doneSvg} id={todo.todoId} />
                <span>{todo.content}</span>
              </StTodoLeft>
            </StTodoDone>
          ) : null
        )}
      </StDoneTodosDiv>
    </StDiv>
  );
};

export default ProfilePlanner;

const StDiv = styled.div`
  background-color: #f8f8f8;
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

const StTodoLeft = styled.div`
  margin-left: 2%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-weight: bold;
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
