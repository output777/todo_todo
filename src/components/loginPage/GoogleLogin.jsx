import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { __googleLogin } from "../../redux/modules/loginSlice";

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const GOOGLE_CODE = location.search.split("=")[1].split("&")[0];

  useEffect(() => {
    dispatch(__googleLogin(GOOGLE_CODE));
    navigate("/main");
  }, []);

  return <div>Google Login</div>;
};

export default GoogleLogin;
