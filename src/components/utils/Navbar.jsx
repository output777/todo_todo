import React, { useState } from "react";
import styled from "styled-components";
import homeSvg from "../../assets/img/homeSvg.svg";
import statisticsSvg from "../../assets/img/statisticsSvg.svg";
import mypageSvg from "../../assets/img/mypageSvg.svg";
import plannerSvg from "../../assets/img/plannerSvg.svg";
import clickHomeSvg from "../../assets/img/clickHomeSvg.svg";
import clickStatisticsSvg from "../../assets/img/clickStatisticsSvg.svg";
import clickPlannerSvg from "../../assets/img/clickPlannerSvg.svg";
import clickMypageSvg from "../../assets/img/clickMypageSvg.svg";

const Navbar = () => {
  const [home, setHome] = useState(false);
  const [statistics, setStatistics] = useState(false);
  const [planner, setPlanner] = useState(false);
  const [mypage, setMypage] = useState(false);
  const onClickHomeMenu = () => {
    setHome(true);
    setStatistics(false);
    setPlanner(false);
    setMypage(false);
  };
  const onClickStatisticsMenu = () => {
    setHome(false);
    setStatistics(true);
    setPlanner(false);
    setMypage(false);
  };

  const onClickPlannerMenu = () => {
    setHome(false);
    setStatistics(false);
    setPlanner(true);
    setMypage(false);
  };
  const onClickMypageMenu = () => {
    setHome(false);
    setStatistics(false);
    setPlanner(false);
    setMypage(true);
  };
  return (
    <StNav>
      {home ? (
        <StHome src={clickHomeSvg} onClick={onClickHomeMenu} />
      ) : (
        <StHome src={homeSvg} onClick={onClickHomeMenu} />
      )}
      {statistics ? (
        <StStatistics
          src={clickStatisticsSvg}
          onClick={onClickStatisticsMenu}
        />
      ) : (
        <StStatistics src={statisticsSvg} onClick={onClickStatisticsMenu} />
      )}
      {planner ? (
        <StPlanner src={clickPlannerSvg} onClick={onClickPlannerMenu} />
      ) : (
        <StPlanner src={plannerSvg} onClick={onClickPlannerMenu} />
      )}
      {mypage ? (
        <StMypage src={clickMypageSvg} onClick={onClickMypageMenu} />
      ) : (
        <StMypage src={mypageSvg} onClick={onClickMypageMenu} />
      )}
    </StNav>
  );
};

export default Navbar;

const StNav = styled.div`
  width: 100%;
  position: fixed;
  height: 10%;
  bottom: 0;
  z-index: 2;
  border-top: 1px solid #ddd;

  /* top: 100px; */
  /* box-sizing: border-box; */
  /* background-color: #fff; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const StHome = styled.img`
  cursor: pointer;
`;
const StStatistics = styled.img`
  cursor: pointer;
`;
const StPlanner = styled.img`
  cursor: pointer;
`;
const StMypage = styled.img`
  cursor: pointer;
`;
