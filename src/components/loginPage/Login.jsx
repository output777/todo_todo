import React, { useEffect } from "react";
import styled from "styled-components";
import logo from "../../assets/img/loginPage/logo.svg";
import logoPencil from "../../assets/img/loginPage/logoPencil.svg";
import Phrases from "../../assets/img/loginPage/Phrases.svg";
import kakaoLogin from "../../assets/img/loginPage/kakaoLogin.svg";
import naverLogin from "../../assets/img/loginPage/naverLogin.svg";
import googleLogin from "../../assets/img/loginPage/googleLogin.svg";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Login = () => {
  //카카오 로그인
  const REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  console.log(REDIRECT_URI);

  const onKakaoLoginHandler = async () => {
    // CPRS ERROR 발생
    // const data = await axios.get(`https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`);

    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    console.log(window.location.href);
  };

  //구글 로그인

  const GOOGLE_REST_API_KEY = process.env.REACT_APP_GOOGLE_REST_API_KEY;
  const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
  console.log(GOOGLE_REDIRECT_URI);

  const onGoogleLoginHandler = async () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=${GOOGLE_REST_API_KEY}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile%20openid&access_type=offline&flowName=GeneralOAuthFlow`;

    console.log(window.location.href);
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
        <StNaverBtn src={naverLogin} />
        <StGoogleBtn onClick={onGoogleLoginHandler}>구글 로그인!</StGoogleBtn>
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
const StGoogleBtn = styled.button`
  margin-bottom: -5%;
`;
