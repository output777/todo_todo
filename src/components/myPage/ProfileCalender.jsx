import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';

const ProfileCalender = () => {
  const [day, setDay] = useState('');
  const [weeklist, setWeeklist] = useState([]);
  const days = ['일', '월', '화', '수', '목', '금', '토']

  let now = new Date();
  let date = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const makeWeekArr = (data) => {
    console.log('data!!!', data);
    let day = data.getDay();
    let week = [];
    for (let i = 0; i <= 6; i++) {
      let newDate = new Date(data.valueOf() + 86400000 * (i - day));
      week.push([i, newDate]);
    }
    setWeeklist(week);
    return week;
  }

  console.log('day', day)
  console.log('weeklist', weeklist)


  const onPressArrowLeft = () => {
    let newDate = new Date(day.valueOf() - 86400000 * 7);
    console.log(newDate);
    let newWeek = makeWeekArr(newDate);
    setDay(newDate);
    setWeeklist(newWeek)
  }

  const onPressArrowRight = () => {
    let newDate = new Date(day.valueOf() + 86400000 * 7);
    console.log(newDate);
    let newWeek = makeWeekArr(newDate);
    setDay(newDate);
    setWeeklist(newWeek)
  }

  useEffect(() => {
    setDay(date);
    makeWeekArr(date);
  }, [])

  console.log('day', day);
  console.log(Boolean(day));
  return (
    <>
      <StYearMonth>
        <button onClick={onPressArrowLeft}>이전</button>
        <p className='year'>{day && day.getFullYear()}년</p>
        <p className='month'>{day && day.getMonth() + 1}월</p>
        <button onClick={onPressArrowRight}>다음</button>
      </StYearMonth>
      <StDays>
        {weeklist && weeklist.map((data, index) => (
          <div className='date' key={index}>
            <div>{days[data[0]]}</div>
            <div>{data[1].getDate()}</div>
          </div>
        ))}
      </StDays>
    </>
  )
}

const StYearMonth = styled.div`
  display: flex;
  justify-content:center;

  & button {
    border: none;
    outline: none;
    margin: 0 1rem;
  }

  .year {
    font-size: 1.5rem;
    padding-right: 0.2rem;
  }
  .month {
    font-size: 1.5rem;
  }
`
const StDays = styled.div`
  display:flex;

  & .date {
    /* border: 1px solid #000; */
    width: 50px;
    text-align: center;
    margin:auto;
  }
`

export default ProfileCalender