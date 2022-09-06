import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { __googleLogin } from "../../redux/modules/googleLogin/googleLoginSlice";

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location);
  const GOOGLE_CODE = location.search.split("=")[1].split("&")[0];
  console.log(GOOGLE_CODE);

  useEffect(() => {
    console.log("rendering~~");

    dispatch(__googleLogin(GOOGLE_CODE));
    navigate("/my");
  }, []);

  return <div>Google Login</div>;
};

export default GoogleLogin;
