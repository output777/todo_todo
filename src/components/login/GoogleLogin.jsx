import React, { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { __googleLogin } from "../../redux/modules/loginSlice";


// 구글 로그인만 렌더링 최적화 - useCallback, useEffect 적용
const GoogleLogin = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const GOOGLE_CODE = location.search.split("=")[1].split("&")[0];
  const { user } = useSelector((state) => state.login)

  // 회원가입해서 nickname 없을 때 회원정보 등록하면 작업해줘야 유저정보 없다는 에러가 안나옴
  const nicknameCheck = useCallback((user) => {
    if (user.nickname) {
      navigate('/main')
    } else {
      navigate("/profileinfo");
    }
  }, [navigate]);

  useEffect(() => {
    if (user) {
      nicknameCheck(user)
    }
  }, [user])

  useEffect(() => {
    dispatch(__googleLogin(GOOGLE_CODE));
  }, [dispatch]);

  return <div>Google Login</div>;
};

export default GoogleLogin;
