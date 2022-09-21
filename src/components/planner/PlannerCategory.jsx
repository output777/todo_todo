import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import PlannerCalender from "./PlannerCalender";
import categorySvg from '../../assets/img/categorySvg.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { __getCategory } from '../../redux/modules/plannerSlice';

const PlannerCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { category } = useSelector((state) => state.planner);
  console.log('category', category)
  const onClickAddCategoryHandler = () => {
    navigate('/planner/category')
  }

  useEffect(() => {
    dispatch(__getCategory())
  }, [dispatch]);

  return (
    <StDiv>
      <div className='header'>
        <PlannerCalender />
        <div className='categoryBox'>
          <img className='category' src={categorySvg} alt="categoryIcon" onClick={onClickAddCategoryHandler} />
        </div>
      </div>

      <StCategoryContainer>
        {category.length > 0 && category.map((data) => (
          <StCategoryItem>
            <div className='top'>
              <p className='title'>{data.title}</p>
              <p>총 갯수</p>
            </div>
            <StProgressBarBox>
              <StProgressBar></StProgressBar>
            </StProgressBarBox>
          </StCategoryItem>
        ))}
      </StCategoryContainer>

    </StDiv>
  )
}

const StDiv = styled.div`
  background-color: #fafafa;
  height: 100vh;
  font-family: "SUIT-Regular", sans-serif;

  & div.header {
    width:100%;
    height:100px;
    display: flex;
    background-color:#FFFFFF;
    justify-content:space-between;
    align-items:flex-end;
    padding: 1rem;
    border-bottom: 1px solid #F1F3F5;

    .categoryBox {
      padding:10px;
      display: flex;
      justify-content:center;
      align-items:center;

      img.category {
      width:24px;
      height:24px;
    }
    }
  }
`;

const StCategoryContainer = styled.div`
  padding: 20px;
`

const StCategoryItem = styled.div`
  width:100%;
  height:auto;
  border-radius: 16px;
  background-color:#fff;
  display: flex;
  flex-direction:column;
  box-sizing:border-box;
  margin-bottom:16px;
  padding: 15px 20px;

  & .top {
    display: flex;
    padding-bottom:5px;
    p {
      margin:0
    }
  }
`

const StProgressBarBox = styled.div`
  width:100%;
  height:13px;
  border-radius:10px;
  background-color:#ECECEC;
`

const StProgressBar = styled.div``

export default PlannerCategory