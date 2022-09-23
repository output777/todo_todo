import React, { useState } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { __getTodo } from "../../redux/modules/plannerSlice";

const Calendar = (props) => {
  const dispatch = useDispatch();

  const marks = [
    { achievementRate: 15, addDate: "2022-09-01" },
    { achievementRate: 25, addDate: "2022-09-02" },
    { achievementRate: 55, addDate: "2022-09-03" },
    { achievementRate: 90, addDate: "2022-09-04" },
    { achievementRate: 23, addDate: "2022-09-05" },
    { achievementRate: 30, addDate: "2022-09-06" },
    { achievementRate: 55, addDate: "2022-09-07" },
    { achievementRate: 49, addDate: "2022-09-08" },
    { achievementRate: 70, addDate: "2022-09-09" },
    { achievementRate: 27, addDate: "2022-09-10" },
    { achievementRate: 100, addDate: "2022-09-11" },
  ];

  const [date, setDate] = useState();

  const selectDate = (date) => {
    dispatch(__getTodo(date));
  };

  console.log(dayjs(date).format("YYYY-MM-DD"));

  props.setCalenderdate(date);
  return (
    <StDiv>
      <ReactCalendar
        onChange={setDate}
        onClickDay={selectDate}
        value={date}
        locale='Korean'
        formatDay={(locale, date) => dayjs(date).format("DD")}
        calendarType='US'
        tileClassName={({ date, view }) => {
          if (
            marks.find((x) => {
              if (
                x.addDate === dayjs(date).format("YYYY-MM-DD") &&
                x.achievementRate < 25
              ) {
                return x;
              }
            })
          ) {
            return "highlight1";
          }
          if (
            marks.find((x) => {
              if (
                x.addDate === dayjs(date).format("YYYY-MM-DD") &&
                x.achievementRate >= 25 &&
                x.achievementRate < 50
              ) {
                return x;
              }
            })
          ) {
            return "highlight2";
          }
          if (
            marks.find((x) => {
              if (
                x.addDate === dayjs(date).format("YYYY-MM-DD") &&
                x.achievementRate >= 50 &&
                x.achievementRate < 75
              )
                return x;
            })
          ) {
            return "highlight3";
          }
          if (
            marks.find((x) => {
              if (
                x.addDate === dayjs(date).format("YYYY-MM-DD") &&
                x.achievementRate >= 75
              )
                return x;
            })
          ) {
            return "highlight4";
          }
        }}
      />
    </StDiv>
  );
};

export default Calendar;

const StDiv = styled.div`
  .react-calendar {
    width: 350px;
    max-width: 100%;
    background: white;
    border: 1px solid #a0a096;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
  }
  .react-calendar--doubleView {
    width: 700px;
  }
  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }
  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }
  .react-calendar__navigation button:disabled {
    background-color: #f0f0f0;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #ff8f2740;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    font-weight: bold;
  }
  .react-calendar__month-view__days__day--weekend {
    color: black;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #d7d5d5;
  }
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__tile {
    max-width: 100%;
    padding: 10px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
  }
  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #e6e6e6;
  }
  .react-calendar__tile--now {
    background: #ff8f27;
    border-radius: 50%;
    color: white;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #ffffa9;
  }
  .react-calendar__tile--hasActive {
    background: #ff8f2780;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #ff8f2780;
  }
  .react-calendar__tile--active {
    background: #ff8f2780;
    color: white;
    border-radius: 50%;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #ff8f2780;
    border-radius: 50%;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
  }
`;
