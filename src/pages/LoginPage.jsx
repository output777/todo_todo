import React from "react";
import styled from "styled-components";
import Login from "../components/login/Login";

const LoginPage = () => {
  return (
    <StContainer>
      <Login />
    </StContainer>
  );
};

const StContainer = styled.div`
  width:416px;
  height:850px;
  display: flex;
  background-color: #fff;
  justify-content:center;
  box-sizing:border-box;


  @media screen and (min-height: 850px) {
  height:1180px;
  }

  @media screen and (min-height: 915px) {
  height:1024px;
  }

  @media screen and (min-height: 1024px) {
  height:1180px;
  }
  @media screen and (min-height: 1180px) {
  height:1366px;
  }
`

export default LoginPage;
