import { useState } from "react";
import styled from "styled-components";
import Modal from "../utils/Modal";
import Calendar from "../utils/Calendar";
import calendarSvg from "../../assets/img/calendarSvg.svg";

const PlannerCalender = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <StDateDiv>
      <StSpan>9월 3일 목요일</StSpan>
      <img src={calendarSvg} onClick={openModal} />
      {modalVisible && (
        <Modal
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
          width='350px'
          top='30%'
        >
          <Calendar />
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
