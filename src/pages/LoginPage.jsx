import React from "react";
import Login from "../components/login/Login";

const LoginPage = ({ token, setToken }) => {
  return (
    <Login setToke={setToken} />
  );
};


export default LoginPage;
