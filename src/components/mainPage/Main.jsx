import React from "react";
import styled from "styled-components";
import ProgressBar from "react-bootstrap/ProgressBar";

const main = () => {
  return (
    <>
      <div>투두투두</div>
      <div>어진님,오늘 하루도 힘내세요!</div>
      <StAchievementsBox>asd</StAchievementsBox>
    </>
  );
};

export default main;

const StAchievementsTopBox = styled.div``;

const StAchievementsBox = styled.div`
  box-sizing: border-box;

  position: absolute;
  width: 325px;
  height: 220px;
  left: calc(50% - 325px / 2 + 0.5px);
  top: 176px;

  background: #ffffff;
  /* Grey/2 */

  border: 1px solid #e8e8e8;
  border-radius: 16px;
`;
