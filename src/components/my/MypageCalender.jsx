import { useState } from "react";
import styled from "styled-components";
import Modal from "../utils/Modal";
import Calendar from "../utils/Calendar";
import calendarSvg from "../../assets/img/calendarSvg.svg";
import dayjs from "dayjs";

const MypageCalender = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [calenderdate, setCalenderdate] = useState(
    dayjs(Date.now()).format("YYYY-MM-DD")
  );

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <StDateDiv>
      <StSpan>{dayjs(calenderdate).format("YYYY-MM-DD")}</StSpan>
      <img src={calendarSvg} onClick={openModal} />
      {modalVisible && (
        <Modal
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
          width='350px'
          top='20%'
        >
          <Calendar setCalenderdate={setCalenderdate} />
        </Modal>
      )}
    </StDateDiv>
  );
};

export default MypageCalender;

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
