import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { __kakaoLogin } from '../../redux/modules/loginSlice';


const KakaoLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI
  console.log(location);
  const KAKAO_CODE = location.search.split('=')[1];
  console.log(KAKAO_CODE);


  useEffect(() => {
    console.log('rendering~~')
    // get을 안해도 저절로 실행이 되네?
    dispatch(__kakaoLogin(KAKAO_CODE))
    // navigate('/my')
  }, [])


  return (
    <div>로딩중...</div>
  )
}

export default KakaoLogin