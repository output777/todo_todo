import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { __kakaoLogin } from '../../redux/modules/loginSlice';


const KakaoLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const KAKAO_CODE = location.search.split('=')[1];

  useEffect(() => {
    dispatch(__kakaoLogin(KAKAO_CODE));
    // navigate('/main')
  }, [])


  return (
    <div>로딩중...</div>
  )
}

export default KakaoLogin