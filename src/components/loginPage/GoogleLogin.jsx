import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { __googleLogin } from "../../redux/modules/loginSlice";

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const GOOGLE_CODE = location.search.split("=")[1].split("&")[0];
  const { user } = useSelector((state) => state.login);
  console.log(user);

  const nicknameCheck = () => {
    const nickname = localStorage.getItem("nickname");
    console.log("nickname", nickname, Boolean(nickname));
    if (nickname) {
      navigate("/main");
    } else {
      navigate("/profileinfo");
    }
  };

  console.log(user);
  if (user) {
    nicknameCheck();
  }

  useEffect(() => {
    dispatch(__googleLogin(GOOGLE_CODE));
  }, []);

  return <div>Google Login</div>;
};

export default GoogleLogin;
