import React, { useEffect } from "react";
import styled from "styled-components";
import logo from "../../assets/img/loginPage/logo.svg";
import logoPencil from "../../assets/img/loginPage/logoPencil.svg";
import Phrases from "../../assets/img/loginPage/Phrases.svg";
import Naver from "./Naver";

const Login = () => {
  //카카오 로그인
  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  const onKakaoLoginHandler = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  };

  //구글 로그인

  const GOOGLE_REST_API_KEY = process.env.REACT_APP_GOOGLE_REST_API_KEY;
  const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;

  const onGoogleLoginHandler = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=${GOOGLE_REST_API_KEY}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile%20openid&access_type=offline&flowName=GeneralOAuthFlow`;
  };

  return (
    <StLoginContainer>
      <StPhrases src={Phrases} />
      <StLogobox>
        <StLogo src={logo} />
        <StLogoPencil src={logoPencil} />
      </StLogobox>

      <StLoginBtnbox>
        <StKakaoBtn onClick={onKakaoLoginHandler}>카카오 로그인</StKakaoBtn>
        <Naver />
        <StGoogleBtn onClick={onGoogleLoginHandler}>구글 로그인</StGoogleBtn>
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
const StNaverBtn = styled.button`
  margin-bottom: -5%;
`;
const StGoogleBtn = styled.button`
  margin-bottom: -5%;
`;
