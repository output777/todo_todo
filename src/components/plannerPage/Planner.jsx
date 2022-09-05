import React from "react";
import styled from "styled-components";
import calendarSvg from "../../assets/img/calendarSvg.svg";

const Planner = () => {
  return (
    <div>
      <StDate>
        <sapn>9월 3일 목요일</sapn>
        <img src={calendarSvg} />
      </StDate>
    </div>
  );
};

export default Planner;

const StDate = styled.div`
  display: flex;
`;
