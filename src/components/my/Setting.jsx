import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Setting = ({ setToken }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setToken(null);
    navigate("/login");
    window.location.reload()
  }


  return (
    <div style={{ backgroundColor: "#fff" }}>
      <StArrow onClick={() => navigate("/my")} />
      <StTitle>설정</StTitle>
      <StLine></StLine>
      <StLogout onClick={logoutHandler}>
        로그아웃
      </StLogout>
      <StBackground></StBackground>
    </div>
  );
};

export default Setting;

const StArrow = styled.div`
  position: relative;

  /* background-color: gray; */

  ::after {
    /* background-color: gray; */
    position: absolute;
    top: 2em;
    left: 1em;
    content: "";
    width: 0.7em; /* 사이즈 */
    height: 0.7em; /* 사이즈 */
    border-top: 3px solid #ff7b00; /* 선 두께 */
    border-right: 3px solid #ff7b00; /* 선 두께 */
    transform: rotate(225deg);
  }
`;

const StTitle = styled.div`
  width: 100%;
  height: 10vh;
  font-weight: bold;
  font-size: 1.2em;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const StLine = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: #f1f3f5;
`;

const StLogout = styled.div`
  width: 100%;
  height: 8vh;
  color: #d34c4c;
  font-weight: bold;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StBackground = styled.div`
  background-color: #fafafa;
  height: 85vh;
`;
