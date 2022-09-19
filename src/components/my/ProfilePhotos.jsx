import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getImages, __deleteImages } from "../../redux/modules/mySlice";
import cancelSvg from "../../assets/img/cancelSvg.svg";
import threeDotSvg from "../../assets/img/threeDotSvg.svg";
import Slider from "react-slick";
import Modal from "../utils/Modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProfilePhotos = () => {
  const dispatch = useDispatch();
  const [fullScreen, setFullScreen] = useState(false);
  const [imgCount, setImgCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const { userInfo } = useSelector((state) => state.my);

  const onClickFullScreenImgsHandler = () => {
    setFullScreen(true);
  };

  const onClickFullScreenCloseHandler = () => {
    setFullScreen(false);
  };

  const onMouseEnterImgCounterHandler = (e) => {
    const { className } = e.target;
    setImgCount(Number(className));
  };

  const onClicOptionModalOpenHandler = () => {
    setModalVisible(true);
  };

  const onClickDeleteImgHandler = () => {
    dispatch(__deleteImages(userInfo.imgList[imgCount].id));
    setFullScreen(false);
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    dispatch(__getImages());
  }, [dispatch]);

  return (
    <>
      <StContainer>
        {userInfo &&
          userInfo.imgList.map((data) => (
            <StImg key={data.id} onClick={onClickFullScreenImgsHandler}>
              <img src={data.imgUrl} alt="boast" />
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
              {userInfo && (
                <span>
                  {imgCount + 1}/{userInfo.imgList.length}
                </span>
              )}
            </div>
            <div className="optionBox">
              <img
                src={threeDotSvg}
                alt="optionBtn"
                onClick={onClicOptionModalOpenHandler}
              />
            </div>
          </div>
          <StSliderBox>
            <StyledSlider {...settings}>
              {userInfo &&
                userInfo.imgList.map((data, index) => {
                  return (
                    <div className="imgBox" key={data.id}>
                      <img
                        src={data.imgUrl}
                        alt="img"
                        id={data.id}
                        className={index}
                        onMouseEnter={onMouseEnterImgCounterHandler}
                      />
                    </div>
                  );
                })}
            </StyledSlider>
          </StSliderBox>
        </StFullScreen>
      ) : null}
      <StModalBox>
        {modalVisible && (
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
        )}
      </StModalBox>
    </>
  );
};

const StContainer = styled.div`
  width: 100%;
  height: 50vh;
  background-color: #f8f8f8;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 100px;
  grid-gap: 2px;
  padding-bottom: 70px;

  /* overflow-y: scroll; */
`;

const StImg = styled.div`
  height: 100px;

  & img {
    width: 100%;
    height: 100px;
  }
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  height: 100%;
  width: 100%;
  position: relative;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;

const StSliderBox = styled.div`
  width: 100%;
  height: 500px;
  z-index: 15;
  padding-top: 50px;
  box-sizing: border-box;

  & div.imgBox {
    width: 100%;
    height: 450px;

    img {
      width: 100%;
      height: 100%;
      background-size: contain;
    }
  }
`;

const StFullScreen = styled.div`
  width:100%;
  height:100vh;
  background-color: #111;
  z-index:10;
  position:fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  & .header {
    height:50px;
    display:flex;
    align-items:center;
    padding:15px;
    justify-content:space-between;

    .cancelBox {
    width:15px;
    height:auto;

      img {
        width:100%;
      }
    }

    .imgCount {
      color: #fff;
    }

    .optionBox {
      img {
        transform: rotate(90deg)
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
