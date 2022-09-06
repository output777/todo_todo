import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { __googleLogin } from "../../redux/modules/googleLogin/googleLoginSlice";

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  console.log(location);
  const GOOGLE_CODE = location.search.split("=")[1];
  console.log(GOOGLE_CODE);

  useEffect(() => {
    console.log("rendering~~");
    // get을 안해도 저절로 실행이 되네?
    dispatch(__googleLogin(GOOGLE_CODE));
  }, []);

  return <div>Google Login</div>;
};

export default GoogleLogin;
