import React from "react";
import styled from "styled-components";
import logo from "../assets/img/loginPage/logo.svg";
import logoPencil from "../assets/img/loginPage/logoPencil.svg";
import Phrases from "../assets/img/loginPage/Phrases.svg";
import kakaoLogin from "../assets/img/loginPage/kakaoLogin.svg";
import naverLogin from "../assets/img/loginPage/naverLogin.svg";
import googleLogin from "../assets/img/loginPage/googleLogin.svg";

const LoginPage = () => {
  return (
    <StLoginContainer>
      <StPhrases src={Phrases} />
      <StLogobox>
        <StLogo src={logo} />
        <StLogoPencil src={logoPencil} />
      </StLogobox>

      <StLoginBtnbox>
        <StKakaoBtn src={kakaoLogin} />
        <StNaverBtn src={naverLogin} />
        <StGoogleBtn src={googleLogin} />
      </StLoginBtnbox>
    </StLoginContainer>
  );
};

export default LoginPage;

const StLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 375px;
  max-height: 667px;
`;

const StLogobox = styled.div``;

const StLogo = styled.img`
  width: 150px;
  height: 40px;
  position: relative;
  left: 15px;
  top: 10px;
`;
const StLogoPencil = styled.img`
  width: 38px;
  height: 38px;
  position: relative;
  left: 20px;
  bottom: 10px;
`;
const StPhrases = styled.img`
  width: 175px;
  height: 175px;
  position: relative;
  top: 50px;
`;
const StLoginBtnbox = styled.div`
  margin-top: 100px;
  position: relative;
  left: 30px;
`;
const StKakaoBtn = styled.img`
  margin-bottom: -5%;
`;
const StNaverBtn = styled.img`
  margin-bottom: -5%;
`;
const StGoogleBtn = styled.img`
  margin-bottom: -5%;
`;
