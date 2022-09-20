import React from 'react'
import styled from "styled-components";
import PlannerCalender from "./PlannerCalender";
import categorySvg from '../../assets/img/categorySvg.svg';
import categoryAddSvg from '../../assets/img/categoryAddSvg.svg';
import { useNavigate } from 'react-router-dom';

const PlannerCategory = () => {
  const navigate = useNavigate();

  const onClickAddCategoryHandler = () => {
    navigate('/planner/category')
  }

  return (
    <StDiv>
      <div className='header'>
        <PlannerCalender />
        <div className='categoryBox'>
          <img className='category' src={categorySvg} alt="categoryIcon" onClick={onClickAddCategoryHandler} />
        </div>
      </div>

      <StPlannerAddBox>
        <img src={categoryAddSvg} alt='categoryAddIcon' />
      </StPlannerAddBox>
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

const StPlannerAddBox = styled.div`
  width:55px;
  height:55px;
  border-radius:75px;
  display: flex;
  align-items:center;
  justify-content:center;
  background-color:#FF8F27;
  position:fixed;
  top:665px;
  left:281px;
`





export default PlannerCategory