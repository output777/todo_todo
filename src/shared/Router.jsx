import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import PlannerPage from "../pages/PlannerPage";
import StatisticsPage from "../pages/StatisticsPage";
import MyPage from "../pages/MyPage";
import KakaoLogin from "../components/login/KakaoLogin";
import GoogleLogin from "../components/login/GoogleLogin";
import NaverLogin from "../components/login/NaverLogin";
import ProfileInfoPage from "../pages/ProfileInfoPage";
import PlannerCategoryAdd from "../components/planner/PlannerCategoryAdd";
import FollowerPage from "../pages/FollowerPage";
import FollowingPage from "../pages/FollowingPage";
import Setting from "../components/my/Setting";
import ProfileEdit from "../components/my/ProfileEdit";
import Planner from "../components/planner/Planner";
import OtherMyPage from "../pages/OtherMyPage";

const Router = () => {
  let token = localStorage.getItem("accessToken");
  let nickname = localStorage.getItem("nickname");
  console.log(token);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/login'
          element={token !== null ? <Navigate replace to='/' /> : <LoginPage />}
        />
        <Route path='/' element={<MainPage />} />
        <Route path='/my' element={<MyPage />} />
        <Route path='/othermy/:id' element={<OtherMyPage />} />
        <Route path='/follower' element={<FollowerPage />} />
        <Route path='/following' element={<FollowingPage />} />
        <Route path='/profileedit' element={<ProfileEdit />} />
        <Route path='/setting' element={<Setting />} />
        <Route path='/planner' element={<PlannerPage />} />
        <Route path='/planner/category' element={<PlannerCategoryAdd />} />
        <Route path='/planner/category/todolist' element={<Planner />} />
        <Route path='/statistics' element={<StatisticsPage />} />
        <Route path='/profileinfo' element={<ProfileInfoPage />} />
        <Route path='/user/kakao/callback' element={<KakaoLogin />} />
        <Route path='/user/google/callback' element={<GoogleLogin />} />
        <Route path='/user/naver/callback' element={<NaverLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
