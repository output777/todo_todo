import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';

const ProfileCalender = () => {
  const [day, setDay] = useState('');
  const [weeklist, setWeeklist] = useState([]);
  const days = ['일', '월', '화', '수', '목', '금', '토']

  let now = new Date();
  let date = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  console.log(day)
  console.log(typeof day)
  const makeWeekArr = (data) => {
    let day = data.getDay();
    let week = [];
    for (let i = 0; i <= 6; i++) {
      let newDate = new Date(data.valueOf() + 86400000 * (i - day));
      week.push([i, newDate]);
    }
    setWeeklist(week);
    return week;
  }


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
    console.log(typeof newDate);
    let newWeek = makeWeekArr(newDate);
    setDay(newDate);
    setWeeklist(newWeek)
  }

  console.log(weeklist.map((data) => {
    console.log(data[1].getTime() === date.getTime());
  }))

  console.log(Math.random().toFixed(2));

  useEffect(() => {
    setDay(date);
    makeWeekArr(date);
  }, [])

  return (
    <>
      <StYearMonth>
        <button onClick={onPressArrowLeft}>⬅</button>
        <p className='year'>{day && day.getFullYear()}년</p>
        <p className='month'>{day && day.getMonth() + 1}월</p>
        <button onClick={onPressArrowRight}>➡</button>
      </StYearMonth>
      <StDays>
        {weeklist && weeklist.map((data, index) => (
          <div className='date' key={index} >
            <div>
              {data[1].getTime() === date.getTime()
                ?
                <div className='today'>
                  <p>{days[data[0]]}</p>
                  <StAchievementRate opacity={Math.random().toFixed(2)}>{data[1].getDate()}</StAchievementRate>
                </div>
                :
                <div>
                  <p>{days[data[0]]}</p>
                  <StAchievementRate opacity={Math.random().toFixed(2)}>{data[1].getDate()}</StAchievementRate>
                </div>
              }
            </div>
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
    background-color: inherit;
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
    width: 50px;
    text-align: center;
    margin:auto;
    } 

  & .date {

    .today  {
      background: #d7d5d5;
      border-radius: 20px;

      p {
        margin: 0;
        }
    }
  & p {
      margin: 0;
    }

  }
`

const StAchievementRate = styled.div`
  background: rgba(255,143,39, ${props => props.opacity});
  z-index:2;
  height: 50px;
  border-radius: 20px;
  display: flex;
  align-items:center;
  justify-content:center;
  `

export default ProfileCalender