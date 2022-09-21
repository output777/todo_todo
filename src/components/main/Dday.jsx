import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { __getDday, __updateDday } from "../../redux/modules/mainSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../utils/Modal";

const Dday = () => {
  const [ddate, setDdate] = useState({
    title: "",
    selectedDate: "",
  });

  const onChangeHandler = (e) => {
    const { value } = e.target;
    setDdate({
      ...ddate,
      title: value,
    });
    //console.log(ddate);
  };

  const onChangeDateHandler = (e) => {
    const { value } = e.target;
    setDdate({
      ...ddate,
      selectedDate: value,
    });
    //console.log(ddate);
  };

  const onSubmitHandler = async () => {
    await dispatch(
      __updateDday({
        ...ddate,
        title: ddate.title,
        selectedDate: ddate.selectedDate,
      })
    );
    await dispatch(__getDday());
  };
  console.log(Date.now());
  console.log(ddate.selectedDate.replace(/\-/g, ""));

  //옵셔널 체이닝을 사용하여 데이터를 불러오느라 아직 없을 경우에는 에러가 아닌 null을, 데이터가 있으면 값을 불러옴
  // const dday = useSelector((state) => state.main?.todos);
  const dday = useSelector((state) => state.main);
  console.log(dday.dday);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getDday());
  }, [dispatch]);

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  //state를 불러오는중이라 null인 상태일때는 아래 if문을,response를 받게되면 원래의 return문 출력
  if (!dday) {
    return <div></div>;
  }

  return (
    <div>
      {modalVisible && (
        <Modal
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
          width='350px'
          height='330px'
          top='45%'
          radius='48px'
          backgroundcolor='rgba(31, 31, 31, 0.116)'
        >
          <StModalTop>디데이</StModalTop>
          <StInputbox>
            <input type='text' maxLength='8' onChange={onChangeHandler} />
          </StInputbox>
          <StDate>날짜</StDate>
          <StDateInput
            type={"date"}
            min='2012-01-01'
            max='2032-12-31'
            onChange={onChangeDateHandler}
          ></StDateInput>
          <StModalBottom>
            <StCancelBtn onClick={closeModal}>취소</StCancelBtn>
            <StCompleteBtn
              onClick={() => {
                onSubmitHandler();
                closeModal();
              }}
            >
              완료
            </StCompleteBtn>
          </StModalBottom>
        </Modal>
      )}
      <StDdayBox onClick={openModal}>
        {dday.dday.title}
        {dday.dday.remaingDay > 0
          ? `+${dday.dday.remaingDay}`
          : dday.dday.remaingDay}
      </StDdayBox>
    </div>
  );
};

const StDdayBox = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 69px;
  height: 34px;
  border: 1px solid #ff8f27;
  border-left: none;
  border-right: none;
`;

const StModalTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 85px;

  border-radius: 48px 48px 0 0;
  font-weight: bold;
  font-size: 1.2em;
`;

const StInputbox = styled.div`
  display: flex;
  justify-content: center;
  input {
    width: 300px;
    height: 50px;
    border: 1px solid #e8e8e8;
    border-radius: 16px;
  }
`;

const StDate = styled.div`
  margin-left: 25px;
  padding-top: 15px;
`;

const StDateInput = styled.input`
  border: 1px solid #e8e8e8;
  border-radius: 16px;
  margin-left: 25px;
  margin-top: 8px;
  width: 170px;
  height: 50px;
`;

const StModalBottom = styled.div`
  position: relative;
  top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 50px;
  border-top: 1px solid #f1f3f5;
`;

const StCancelBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 175px;
  height: 50px;
  border-right: 1px solid #f1f3f5;
`;
const StCompleteBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 175px;
  height: 50px;
  color: #ff7b00;
`;
export default Dday;
