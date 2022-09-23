import { useState } from "react";
import styled from "styled-components";
import Modal from "../utils/Modal";
import Calendar from "../utils/Calendar";
import dayjs from "dayjs";
import calendarSvg from "../../assets/img/calendarSvg.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { __getTodo } from "../../redux/modules/plannerSlice";

const PlannerCalender = ({ calenderdate, selectDate, setSelectDate }) => {
  const dispatch = useDispatch();
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

  // const { dateTodo } = useSelector((data) => data.planner)
  // console.log('dateTodo', dateTodo)

  const [modalVisible, setModalVisible] = useState(false);
  // const [date, setDate] = useState(null);
  // const [calenderdate, setCalenderdate] = useState(dayjs(Date.now()).format("YYYY-MM-DD"));
  // dayjs(Date.now()).format("YYYY-MM-DD")


  // console.log(selectDate);
  // console.log(calenderdate);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };


  useEffect(() => {
    // console.log(selectDate);
    // console.log(calenderdate);
    // console.log('new Date', new Date(selectDate))
    // console.log('selectDate', selectDate, Boolean(selectDate))
    // if (!selectDate) {
    //   setCalenderdate(dayjs(Date.now()).format("YYYY-MM-DD"))
    // } else {
    //   console.log('new Date', new Date(selectDate))
    // }
  }, [])


  // useEffect(() => {
  //   if (selectDate) {
  //     setCalenderdate(dayjs(new Date(selectDate)).format("YYYY-MM-DD"))
  //   }
  // }, [selectDate])

  // useEffect(() => {
  //   dispatch(__getTodo(calenderdate))
  // }, [dispatch, calenderdate])

  // console.log('calenderdate', calenderdate)

  return (
    <StDateDiv>
      <StSpan>{dayjs(calenderdate).month() + 1}월 {dayjs(calenderdate).date()}일 {days[dayjs(calenderdate).day()]}</StSpan>
      <img src={calendarSvg} onClick={openModal} alt='calendarIcon' />
      {modalVisible && (
        <Modal
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
          width='350px'
          top='30%'
        >
          <Calendar selectDate={selectDate} setSelectDate={setSelectDate} />
        </Modal>
      )}
    </StDateDiv>
  );
};

export default PlannerCalender;

const StDateDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;

  margin-left: 3%;
  padding: 10px;
  font-size: 18px;
`;

const StSpan = styled.span`
  font-weight: bold;
`;
