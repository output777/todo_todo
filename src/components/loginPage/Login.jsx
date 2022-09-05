import React from "react";
import styled from "styled-components";
import logo from "../../assets/img/loginPage/logo.svg";
import logoPencil from "../../assets/img/loginPage/logoPencil.svg";
import Phrases from "../../assets/img/loginPage/Phrases.svg";
import kakaoLogin from "../../assets/img/loginPage/kakaoLogin.svg";
import naverLogin from "../../assets/img/loginPage/naverLogin.svg";
import googleLogin from "../../assets/img/loginPage/googleLogin.svg";
import { useLocation } from "react-router-dom";

const Login = () => {

  const onKakaoLoginHandler = () => {
    window.location.href = 'https://accounts.kakao.com/login?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A8080%252Fuser%252Fkakao%252Fcallback%26through_account%3Dtrue%26client_id%3D7961d1dae4bcc3e0b41dac5ca7150775';

    // const PARAMS = new URL(document.location).searchParams;
    // const KAKAO_CODE = PARAMS.get('code');
    // console.log(KAKAO_CODE);
  }



  return (
    <StLoginContainer>
      <StPhrases src={Phrases} />
      <StLogobox>
        <StLogo src={logo} />
        <StLogoPencil src={logoPencil} />
      </StLogobox>

      <StLoginBtnbox>
        <StKakaoBtn onClick={onKakaoLoginHandler}>카카오 로그인</StKakaoBtn>
        <StNaverBtn src={naverLogin} />
        <StGoogleBtn src={googleLogin} />
      </StLoginBtnbox>
    </StLoginContainer>
  );
};

export default Login;

const StLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
const StKakaoBtn = styled.button`
  margin-bottom: -5%;
`;
const StNaverBtn = styled.img`
  margin-bottom: -5%;
`;
const StGoogleBtn = styled.img`
  margin-bottom: -5%;
`;
