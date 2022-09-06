import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NaverLogin = () => {
  const navigate = useNavigate();
  const { naver } = window;
  console.log(naver);
  const NAVER_REST_API_KEY = process.env.REACT_APP_NAVER_API_KEY;
  const NAVER_REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId(
      {
        clientId: NAVER_REST_API_KEY,
        callbackUrl: NAVER_REDIRECT_URI,
        isPopup: false,
        loginButton: { color: "green", type: 3, height: 58 },
        callbackHandler: true,
      }
    )
    naverLogin.init();
  }

  const userAccessToken = () => {
    window.location.href.includes('access_token') && getToken()
  }

  const getToken = () => {
    const token = window.location.href.split('=')[1].split('&')[0]
    console.log(token);
    localStorage.setItem('access_token', token)
  }


  useEffect(() => {
    initializeNaverLogin();
    userAccessToken();
    // navigate('/my')
  })


  return (
    <>
      <div id="naverIdLogin"></div>
    </>
  )
}

export default NaverLogin