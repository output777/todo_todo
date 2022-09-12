import React from "react";
import styled from "styled-components";
import ProgressBar from "react-bootstrap/ProgressBar";
import InfiniteScroll from "./InfiniteScroll";

const main = () => {
  return (
    <>
      <div>투두투두</div>
      <div>현지님,오늘 하루도 힘내세요!</div>

      <StTopBox>
        <div>현지님의 업적</div>
        <div>이번달 플래너 달성률</div>
        <div>10%</div>
        <ProgressBar now={10} />
      </StTopBox>
      <div>랭킹</div>
      <StRankingButton>
        <button>월간 랭킹</button>
        <button>주간 랭킹</button>
      </StRankingButton>
      <StScrollDiv>
        <InfiniteScroll />
      </StScrollDiv>
    </>
  );
};

export default main;

const StTopBox = styled.div`
  width: 90%;
  margin: 20px auto;
  height: 220px;
  box-shadow: 0px 4px 15px 0px rgba(17, 17, 17, 0.05);
  border-radius: 16px;
`;
const StTopBoxHead = styled.div``;

const StRankingButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin: 10px 0px 10px 0px;
`;

const StScrollDiv = styled.div`
  overflow: scroll;
  height: 300px;
  ::-webkit-scrollbar {
    width: 10px;
    height: 20px;
    border-radius: 0px;
    background: rgba(255, 255, 255, 0.4);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #d1d1d1;
  }
`;
