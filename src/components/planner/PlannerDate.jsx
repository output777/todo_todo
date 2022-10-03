import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import leftArrowSvg from "../../assets/img/leftArrowSvg.svg";
import notDoneSvg from "../../assets/img/notDoneSvg.svg";
import doneSvg from "../../assets/img/doneSvg.svg";

const PlannerDate = ({
  selectedCategoryName,
  dateTodo,
  display,
  setDisplay,
}) => {
  console.log("dateTodo", dateTodo);

  const [todoList, setTodoList] = useState([]);
  const [todoRate, setTodoRate] = useState(0);

  const onClickBackPlannerHandler = () => {
    setDisplay(false);
  };

  useEffect(() => {
    const rate = (
      (todoList.filter((data) => data.complete === true).length /
        todoList.length) *
      100
    ).toFixed();
    console.log("rate", rate);
    setTodoRate(rate);
  }, [todoList]);

  useEffect(() => {
    if (dateTodo !== "") {
      const data = dateTodo.filter(
        (data) => data.category === selectedCategoryName
      );
      console.log("data", data);
      setTodoList([...data]);
    } else {
      setTodoList([]);
    }
  }, [selectedCategoryName, display]);

  return (
    <StDiv display={display}>
      <div className="header">
        <StHeaderBox>
          <div className="iconBox">
            <img
              src={leftArrowSvg}
              alt="leftArrowIcon"
              onClick={onClickBackPlannerHandler}
            />
          </div>
          <div className="categoryTitle">
            <p>{selectedCategoryName}</p>
          </div>
          <div></div>
        </StHeaderBox>
        <StCategoryProgressContainer>
          <div className="top">
            <p className="title">
              {todoList.filter((data) => data.complete === true).length}/
              {todoList.length}
            </p>
            <p>{isNaN(todoRate) ? 0 : todoRate}%</p>
          </div>
          <StProgressBarBox>
            <StProgressBar
              width={isNaN(todoRate) ? 0 : todoRate}
            ></StProgressBar>
          </StProgressBarBox>
        </StCategoryProgressContainer>
      </div>

      <StTodoContainer>
        {todoList.length > 0 &&
          todoList
            .filter((data) => data.complete === false)
            .map((data) => (
              <StTodoItem key={data.todoId} name={data.title}>
                <div className="top" id={data.todoId}>
                  <div
                    className="content"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <img src={notDoneSvg} alt="notDoneIcon" />
                    <StTodoTitle className="title">{data.content}</StTodoTitle>
                  </div>
                </div>
              </StTodoItem>
            ))}
      </StTodoContainer>

      <StTodoContainer>
        {todoList.length > 0 &&
          todoList
            .filter((data) => data.complete === true)
            .map((data) => (
              <StTodoItem key={data.todoId} name={data.title}>
                <div className="top" id={data.todoId}>
                  <div
                    className="content"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <img src={doneSvg} alt="doneIcon" />
                    <StTodoTitle className="title" color="#E8E8E8">
                      {data.content}
                    </StTodoTitle>
                  </div>
                </div>
              </StTodoItem>
            ))}
      </StTodoContainer>
    </StDiv>
  );
};

const StDiv = styled.div`
  width: 100%;
  min-width: 360px;
  background-color: #fafafa;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: ${(props) => (props.display ? "block" : "none")};
  font-family: "SUIT-Regular", sans-serif;
  overflow: hidden auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (min-width: 768px) {
    width: 600px;
  }

  & .header {
    width: 100%;
    min-width: 360px;
    height: 110px;
    position: fixed;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #f1f3f5;
    box-sizing: border-box;

    @media screen and (min-width: 768px) {
      width: 600px;
    }
  }
`;

const StHeaderBox = styled.div`
  display: flex;
  /* width:100%; */
  height: 50px;
  justify-content: space-between;
  align-items: center;
  & div {
    flex: 1;
  }
  & .iconBox {
    padding-left: 10px;

    img {
      /* position:absolute; */
      /* bottom:0px; */
      /* transform:translateY(-50%) */
    }
  }

  & .categoryTitle {
    text-align: center;
    transform: translateX(-5px);
  }
`;

const StCategoryProgressContainer = styled.div`
  width: 100%;
  height: auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  padding: 0rem 1rem;
  & .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 5px;

    p {
      margin: 0;
    }
  }
`;

const StProgressBarBox = styled.div`
  width: 100%;
  height: 13px;
  border-radius: 10px;
  background-color: #ececec;
`;

const StProgressBar = styled.div`
  ${({ width }) => {
    if (width < 33) {
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

const StModalBtnBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 1rem;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 40px;

  & p {
    width: 100%;
    margin: 0;
    text-align: center;
    padding: 5px;
  }

  & p.title {
    font-weight: 600;
  }

  & .btnBox {
    display: flex;
  }
`;

const StTodoInput = styled.textarea`
  // props로 입력할 때 마다 border 색 변경하기
  border: 1px solid #d7d5d5;
  height: 75px;
  width: 100%;
  padding: 0.5rem;
  border-radius: 16px;
  outline: none;
  resize: none;
`;

const StModalBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50%;
  outline: none;
  border: none;
  background-color: white;
  color: #ff8f27;

  margin-top: 5%;

  &:last-child {
    border-bottom: none;
  }
`;

const StTodoContainer = styled.div`
  padding: 20px;
  transform: translateY(100px);
  /* margin-top:20px; */
`;

const StTodoItem = styled.div`
  width: 100%;
  height: 52px;
  border-radius: 16px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 16px 0;
  padding: 15px 20px;
  -webkit-box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1);
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1);

  & .top {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 5px;

    div.content {
      width: 90%;
    }

    div.option {
      width: 10%;
    }
  }
`;

const StTodoTitle = styled.p`
  padding-left: 10px;
  margin: 0;
  color: ${(props) => props.color || "#111"};
`;

export default PlannerDate;
