import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import PlannerPage from '../pages/PlannerPage';
import StatisticsPage from '../pages/StatisticsPage';
import MyPage from '../pages/MyPage';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/main' element={<MainPage />} />
        <Route path='/my' element={<MyPage />} />
        <Route path='/planner' element={<PlannerPage />} />
        <Route path='/statistics' element={<StatisticsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router