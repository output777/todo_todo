import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import PlannerCalender from "./PlannerCalender";
import categorySvg from '../../assets/img/categorySvg.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { __getTodo } from '../../redux/modules/plannerSlice';
import Navbar from '../utils/Navbar';
import dayjs from "dayjs";
import PlannerDate from './PlannerDate';

const PlannerCategoryDate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectDate, setSelectDate] = useState(null);

  const { dateTodo, date } = useSelector((state) => state.planner);

  // dayjs(Date.now()).format("YYYY-MM-DD")
  const [calenderdate, setCalenderdate] = useState(null);
  const [dateTodoObj, setDateTodoObj] = useState({});
  const [categoryTodoList, setCategoryTodoList] = useState([]);
  const [categoryTodoComplete, setCategoryTodoComplete] = useState({});
  const [x, setX] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');

  console.log('dateTodo', dateTodo, 'date', date, 'selectDate', selectDate);

  const onClickAddCategoryHandler = () => {
    navigate('/planner/category')
  }

  const onClickSelectCategoryToTodoListHandler = (e) => {
    const { title } = e.currentTarget;
    setSelectedCategoryName(title);
    setX(true)
  }

  useEffect(() => {
    console.log('dateTodo', dateTodo, 'date', date)
    const obj = {};
    let arr = [];
    const arrComplete = {};
    // obj.dateTodo[0]['category'] = true;
    if (dateTodo.length > 0) {

      const completeTodo = dateTodo.filter((data) => data['complete'] === true);
      console.log('completeTodo', completeTodo)


      console.log(dateTodo[0])
      console.log(dateTodo.length)
      console.log(obj[`${dateTodo[0].category}`] === undefined);
      console.log(arrComplete[`${completeTodo[0].category}`]);

      for (let i = 0; i < dateTodo.length; i++) {
        obj[`${dateTodo[i].category}`] = (obj[`${dateTodo[i].category}`] || 0) + 1;
        // arrComplete[`${completeTodo[i].category}`] = (arrComplete[`${completeTodo[i].category}`] || 0) + 1;

      }

      for (let i = 0; i < completeTodo.length; i++) {
        arrComplete[`${completeTodo[i].category}`] = (arrComplete[`${completeTodo[i].category}`] || 0) + 1;

      }
    }

    console.log('obj', obj)
    arr = Object.keys(obj);
    console.log('arr', arr);
    console.log('arrComplete', arrComplete);
    console.log('categoryTodoComplete', categoryTodoComplete)

    setCategoryTodoComplete(arrComplete)
    setCategoryTodoList(arr)
    setDateTodoObj(obj);
  }, [calenderdate])

  console.log('dateTodoObj', dateTodoObj, 'categoryTodoList', categoryTodoList);

  useEffect(() => {
    console.log(date);
    setCalenderdate(dayjs(date).format("YYYY-MM-DD"))
  }, [date])

  useEffect(() => {
    console.log('localStorage.getItem', localStorage.getItem('date'))
    dispatch(__getTodo(localStorage.getItem('date')));
  }, [dispatch])

  return (
    <>
      <StDiv>
        <div className='header'>
          <PlannerCalender calenderdate={calenderdate} selectDate={selectDate} setSelectDate={setSelectDate} />
          <div className='categoryBox'>
            <img className='category' src={categorySvg} alt="categoryIcon" onClick={onClickAddCategoryHandler} />
          </div>
        </div>

        <StCategoryContainer>
          {categoryTodoList.length > 0 && categoryTodoList.map((data, index) => (
            <StCategoryItem key={index} id={index} >
              <div className='top' title={data} onClick={onClickSelectCategoryToTodoListHandler} >
                <p className='title'>{data}</p>
                {categoryTodoList.length > 0 &&
                  <p onClick={(e) => e.stopPropagation()}>
                    {categoryTodoComplete[`${categoryTodoList[index]}`] === undefined ? 0 : categoryTodoComplete[`${categoryTodoList[index]}`]}/{dateTodoObj[`${categoryTodoList[index]}`]}
                  </p>
                }
              </div>
              <StProgressBarBox onClick={(e) => e.stopPropagation()}>
                <StProgressBar width={isNaN(categoryTodoComplete[`${categoryTodoList[index]}`] / dateTodoObj[`${categoryTodoList[index]}`]) ? 0 : categoryTodoComplete[`${categoryTodoList[index]}`] / dateTodoObj[`${categoryTodoList[index]}`] * 100} backgroundColor='#74E272'></StProgressBar>
              </StProgressBarBox>
            </StCategoryItem>
          ))}
        </StCategoryContainer>

      </StDiv>
      <Navbar />
      <PlannerDate selectedCategoryName={selectedCategoryName} dateTodo={dateTodo} x={x} setX={setX} />
    </>

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
  -webkit-box-shadow: 0px 4px 8px -2px rgba(16,24,40,0.1); 
  box-shadow: 0px 4px 8px -2px rgba(16,24,40,0.1);

  & .top {
    display: flex;
    justify-content:space-between;
    align-items:center;
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

const StProgressBar = styled.div`
  transition: all 0.3s;
  width: ${props => props.width + '%' || '0%'};
  height:13px;
  border-radius:10px;
  background:${props => props.backgroundColor || '#D34C4C'};
`

export default PlannerCategoryDate;