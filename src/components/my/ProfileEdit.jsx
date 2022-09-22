import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import defaultProfile from "../../assets/img/defaultProfile.jpg";
import profileImgSvg from "../../assets/img/profileImgSvg.svg";
import pencilSvg from "../../assets/img/pencilSvg.svg";
import Modal from "../utils/Modal";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [saveStatus, setSaveStatus] = useState(false);
  const [modalView, setModalView] = useState(false);
  const modalToggleHandler = (parameter) => {
    setModalView(!modalView);
    // setModal(parameter);
  };
  return (
    <>
      <StTitle>
        <div
          className="arrow"
          onClick={() => {
            if (saveStatus == false) {
              setModalView(true);
            } else {
              navigate("/my");
            }
          }}
        />
        <div className="title">프로필 편집</div>
        <button
          onClick={() => {
            navigate("/my");
          }}
        >
          완료
        </button>
      </StTitle>

      <StLine></StLine>
      <StImgDiv>
        <StImg src={profileImgSvg} />
        <div className="pencilBox">
          <img className="pencil" src={pencilSvg} />
        </div>
      </StImgDiv>

      <StMotto>
        <div>좌우명</div>
        <textarea className="textArea"></textarea>
        <div>0/40</div>
      </StMotto>

      {/* ------------ 안내창 모달 -------------*/}
      {modalView ? (
        <Modal
          visible={modalView}
          closable={true}
          maskClosable={true}
          onClose={modalToggleHandler}
          radius="48px"
          top="40%"
          width="90%"
          height="230px"
          backgroundcolor="#46464624"
        >
          <StModalTop>
            <div className="title">저장되지 않은 변경 사항</div>
            <div>뒤로가기 하시겠습니까?</div>
            <div>변경사항이 저장되지 않았습니다.</div>
          </StModalTop>
          <StModalBottom>
            <div
              className="cancel"
              onClick={() => {
                setModalView(false);
              }}
            >
              취소
            </div>
            <div
              className="confirm"
              onClick={() => {
                navigate("/my");
              }}
            >
              확인
            </div>
          </StModalBottom>
        </Modal>
      ) : null}
    </>
  );
};

export default ProfileEdit;

const StModalTop = styled.div`
  height: 75%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    font-size: 1.3em;
    font-weight: bold;
    margin-bottom: 1em;
  }
`;
const StModalBottom = styled.div`
  border-top: 1px solid lightgray;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 25%;

  div {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .confirm {
    border-left: 1px solid lightgray;
  }
`;

const StMotto = styled.div`
  width: 90%;
  margin: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;

  .textArea {
    border: 1px solid black;
    border-radius: 20px;
    width: 90%;
    height: 10em;
  }
`;
const StImgDiv = styled.div`
  position: relative;
  width: 80%;
  margin: 10% auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .pencilBox {
    width: 3em;
    height: 3em;
    border-radius: 100%;
    background-color: #ff8f27;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    position: absolute;
    right: 5em;
    top: 4.3em;
  }
  .pencil {
  }
`;
const StImg = styled.img`
  width: 40%;
  height: 40%;
  border-radius: 100px;
`;

const StTitle = styled.div`
  width: 90%;
  margin: auto;
  height: 10vh;
  font-weight: bold;
  font-size: 1.2em;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .title {
    position: relative;
    left: 1.3em;
  }

  button {
    width: 15%;
    height: 50%;
    font-size: 0.9em;
    background-color: white;
    color: #ff7b00;
    border: none;
  }

  .arrow {
    position: relative;
    /* background-color: gray; */
  }

  .arrow::after {
    /* background-color: gray; */
    position: absolute;
    left: 0;
    top: -0.3em;
    content: "";
    width: 0.7em; /* 사이즈 */
    height: 0.7em; /* 사이즈 */
    border-top: 3px solid #ff7b00; /* 선 두께 */
    border-right: 3px solid #ff7b00; /* 선 두께 */
    transform: rotate(225deg);
  }
`;

const StLine = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: #f1f3f5;
`;
