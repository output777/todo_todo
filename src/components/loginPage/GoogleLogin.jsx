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

  const nicknameCheck = useCallback((user) => {
    if (user.nickname) {
      navigate('/main')
    } else {
      navigate("/profileinfo");
    }
  }, [navigate]);

  useEffect(() => {
    dispatch(__googleLogin(GOOGLE_CODE));
    if (user) {
      nicknameCheck(user)
    }
  }, [dispatch, user, nicknameCheck]);

  return <div>Google Login</div>;
};

export default GoogleLogin;
