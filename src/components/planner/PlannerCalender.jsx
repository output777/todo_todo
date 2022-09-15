import { useState } from "react";
import styled from "styled-components";
import Modal from "../utils/Modal";
import calendarSvg from "../../assets/img/calendarSvg.svg";

const PlannerCalender = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openCalender = () => {
    setModalVisible(true);
  };

  const openModal = (e, index) => {
    // console.log(e, index);
    // console.log(e.target.id);
    setModalVisible(true);
    localStorage.setItem("todoId", e.target.id);
    localStorage.setItem("index", index);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <StDateDiv>
      <StSpan>9월 3일 목요일</StSpan>
      <img src={calendarSvg} onClick={openCalender} />
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
