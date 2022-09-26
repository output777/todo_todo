import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getImages, __deleteImages } from "../../redux/modules/mySlice";
import cancelSvg from "../../assets/img/cancelSvg.svg";
import threeDotSvg from "../../assets/img/threeDotSvg.svg";
import wastebasketSvg from "../../assets/img/myPage/wastebasket.svg";
import Modal from "../utils/Modal";

const ProfilePhotos = () => {
  const dispatch = useDispatch();
  const [fullScreen, setFullScreen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectImgId, setSelectImgId] = useState(1);
  const [selectImg, setSelectImg] = useState("");
  const [selectImgIndex, setSelectImgIndex] = useState(0);

  const { userInfo } = useSelector((state) => state.my);
  const { images } = useSelector((state) => state.my);
  console.log("images", images);
  // console.log("userInfo", userInfo);
  console.log(selectImgId);

  // 1
  const onClickFullScreenImgsHandler = (e) => {
    const { id } = e.target;
    console.log("e.target.id", id);
    selectImgFunc(id);

    // console.log('userInfo', userInfo.imgList, userInfo.imgList.length);
  };

  // 2
  const selectImgFunc = (id) => {
    const data = images.filter((data) => data.id === Number(id));
    // console.log("filter data", data);

    setSelectImgId(id);
    setSelectImg(data[0].imageUrl);
    setFullScreen(true);

    // const data = userInfo.imgList.filter((data) => data.id === Number(id));
    // const index = userInfo.imgList.indexOf(...data);
    // setSelectImgIndex(index); //* */
  };

  const onClickPrevHandler = (id) => {
    let a = images.find((data) => data.id == id);
    const prevData = images[images.indexOf(a) - 1];
    console.log(prevData);
    setSelectImgId(prevData.id);
    setSelectImg(prevData.imageUrl);

    // console.log(images.indexOf(a));
    // console.log(typeof Number(a));
    // setSelectImgIndex((prev) => prev - 1);
    // console.log('prevData', prevData);
  };

  const onClickNextHandler = (id) => {
    let a = images.find((data) => data.id == id);
    const nextData = images[images.indexOf(a) + 1];
    setSelectImgId(nextData.id);
    setSelectImg(nextData.imageUrl);

    // console.log(images.indexOf(a));
    // console.log(nextData);
    // setSelectImgIndex((prev) => prev + 1);
    // console.log('nextData', nextData);
  };

  const onClickFullScreenCloseHandler = () => {
    setFullScreen(false);
  };

  const onClicOptionModalOpenHandler = () => {
    setModalVisible(true);
  };

  const onClickDeleteImgHandler = () => {
    dispatch(__deleteImages(selectImgId));
    setFullScreen(false);
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const nickname = localStorage.getItem("nickname");
  // console.log("nickname", nickname);

  useEffect(() => {
    dispatch(__getImages(nickname));
  }, [dispatch]);
  // console.log("selectImg", selectImg);
  return (
    <>
      <StContainer>
        {/* {userInfo &&
          userInfo.imgList.map((data) => (
            <StImg key={data.id} onClick={onClickFullScreenImgsHandler}>
              <img id={data.id} src={data.imgUrl} alt="boast" />
            </StImg>
          ))} */}
        {images &&
          images.map((data) => (
            <StImg key={data.id} onClick={onClickFullScreenImgsHandler}>
              <img id={data.id} src={data.imageUrl} alt="boast" />
            </StImg>
          ))}
      </StContainer>
      {fullScreen ? (
        <StFullScreen>
          <div className="header">
            <div className="cancelBox" onClick={onClickFullScreenCloseHandler}>
              <img src={cancelSvg} alt="cancelBtn" />
            </div>
            <div className="imgCount">
              {images && (
                <span>
                  {images.indexOf(
                    images.find((data) => data.id == selectImgId)
                  ) + 1}
                  /{images.length}
                </span>
              )}
            </div>
            <div className="optionBox">
              <img
                src={wastebasketSvg}
                alt="optionBtn"
                onClick={onClicOptionModalOpenHandler}
              />
            </div>
          </div>
          <div className="StSliderBoxParent">
            <StSliderBox>
              <div className="imgBox" key={selectImgId}>
                {images.indexOf(
                  images.find((data) => data.id == selectImgId)
                ) == 0 ? null : (
                  <button
                    className="prev"
                    onClick={() => onClickPrevHandler(selectImgId)}
                  >
                    <div className="prevArrow"></div>
                  </button>
                )}

                <img src={selectImg} alt="img" id={selectImgId} />

                {images.indexOf(
                  images.find((data) => data.id == selectImgId)
                ) ==
                images.length - 1 ? null : (
                  <button
                    className="next"
                    onClick={() => onClickNextHandler(selectImgId)}
                  >
                    <div className="nextArrow"></div>
                  </button>
                )}
              </div>
            </StSliderBox>
          </div>
        </StFullScreen>
      ) : null}

      <StModalBox>
        {/* {modalVisible && (
          <Modal
            visible={modalVisible}
            closable={true}
            maskClosable={true}
            onClose={closeModal}
            width="250px"
            height="150px"
            radius="20px"
            top="40%"
            backgroundcolor="rgba(0, 0, 0, 0.2)"
          >
            <div className="btnBox">
              <StModalBtn onClick={onClickDeleteImgHandler}>삭제</StModalBtn>
              <StModalBtn onClick={closeModal}>취소</StModalBtn>
            </div>
          </Modal>
        )} */}

        {/* -------- 안내창 모달 ---------*/}
        {modalVisible ? (
          <Modal
            visible={modalVisible}
            closable={true}
            maskClosable={true}
            onClose={closeModal}
            radius="48px"
            top="40%"
            width="90%"
            height="230px"
            backgroundcolor="#46464624"
          >
            <StModalTop>
              <div className="title">사진을 삭제하시겠습니까?</div>
              <div>삭제하면 다시 불러올 수 없습니다.</div>
            </StModalTop>
            <StModalBottom>
              <div className="cancel" onClick={closeModal}>
                취소
              </div>
              <div className="confirm" onClick={onClickDeleteImgHandler}>
                확인
              </div>
            </StModalBottom>
          </Modal>
        ) : null}
      </StModalBox>
    </>
  );
};

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

const StContainer = styled.div`
  width: 100%;
  height: 80vh;
  background-color: #f8f8f8;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 100px;
  grid-gap: 5px;
  padding-bottom: 70px;

  /* overflow-y: scroll; */
`;

const StImg = styled.div`
  height: 100px;

  & img {
    width: 100%;
    height: 100px;
    margin: auto;
    border-radius: 16px;
  }
`;

const StSliderBox = styled.div`
  width: 100%;
  height: auto;
  z-index: 15;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & div.imgBox {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 95%;
      margin: auto;
      height: 30em;
      background-size: contain;
      border-radius: 30px;
    }

    button {
      position: absolute;
      border: none;
      background-color: transparent;
      border-radius: 50%;
      color: #111;
      top: 50%;
      box-sizing: border-box;
    }

    button.prev {
      left: 0;
    }

    button.next {
      right: 0;
    }

    .prevArrow {
      position: relative;
    }
    .prevArrow::after {
      position: absolute;
      left: 1em;
      top: 0;
      content: "";
      width: 1.5em;
      height: 1.5em;
      border-top: 5px solid #ffffff;
      border-right: 5px solid #ffffff;
      transform: rotate(225deg);
    }

    .nextArrow {
      position: relative;
    }
    .nextArrow::after {
      position: absolute;
      right: 1em;
      top: 0;
      content: "";
      width: 1.5em;
      height: 1.5em;
      border-top: 5px solid #ffffff;
      border-right: 5px solid #ffffff;
      transform: rotate(45deg);
    }
  }
`;

const StFullScreen = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #111111;
  z-index: 10;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  .StSliderBoxParent {
    background-color: #111111;
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  & .header {
    height: 72px;
    display: flex;
    align-items: center;
    padding: 15px;
    justify-content: space-between;
    background-color: white;
  }
  .cancelBox {
    width: 15px;
    height: auto;

    img {
      width: 100%;
    }
  }

  .imgCount {
    color: #111111;
    font-weight: bold;
  }

  .optionBox {
    img {
      /* transform: rotate(90deg); */
    }
  }
`;

const StModalBox = styled.div`
  & .btnBox {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 1rem 0.5rem;
    box-sizing: border-box;
    flex-direction: column;
  }
`;
const StModalBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
  outline: none;
  border: none;
  border-bottom: 1px solid #eee;
  background-color: white;
  color: #ff8f27;

  margin-top: 5%;

  &:last-child {
    border-bottom: none;
  }
`;

export default ProfilePhotos;
