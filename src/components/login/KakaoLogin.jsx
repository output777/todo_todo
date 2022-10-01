import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { __kakaoLogin } from '../../redux/modules/loginSlice';
import Loading from './Loading';


const KakaoLogin = ({ token, setToken }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const KAKAO_CODE = location.search.split('=')[1];

  const { user } = useSelector((state) => state.login)
  console.log(user);

  const nicknameCheck = useCallback((user) => {
    if (user.nickname) {
      navigate('/')
    } else {
      navigate("/profileinfo");
    }
  }, [navigate]);

  useEffect(() => {
    if (user) {
      let token = localStorage.getItem("accessToken");
      nicknameCheck(user);
      setToken(token);
    }
  }, [user])

  useEffect(() => {
    dispatch(__kakaoLogin(KAKAO_CODE));
  }, [])


  return (
    <Loading />
  )
}

export default KakaoLogin