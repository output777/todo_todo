import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getImages } from "../../redux/modules/mySlice";
import cancelSvg from '../../assets/img/cancelSvg.svg';
import threeDotSvg from '../../assets/img/threeDotSvg.svg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";


const ProfilePhotos = () => {
  const dispatch = useDispatch();
  const [fullScreen, setFullScreen] = useState(false);
  const [imgCount, setImgCount] = useState(0);

  const { images, userInfo } = useSelector((state) => state.my);
  console.log("state", images, userInfo);

  const onClickFullScreenImgsHandler = () => {
    setFullScreen(true)
  }

  const onClickFullScreenCloseHandler = () => {
    setFullScreen(false)
  }

  const onMouseEnterImgCounterHandler = (e) => {
    const { className } = e.target;
    setImgCount(Number(className));
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  useEffect(() => {
    dispatch(__getImages())
  }, [dispatch])

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
      {fullScreen
        ?
        <StFullScreen>
          <div className="header">
            <div className="cancelBox" onClick={onClickFullScreenCloseHandler}>
              <img src={cancelSvg} alt='cancelBtn' />
            </div>
            <div className="imgCount">
              {userInfo && <span>{imgCount + 1}/{userInfo.imgList.length}</span>}
            </div>
            <div className="optionBox">
              <img src={threeDotSvg} alt="optionBtn" />
            </div>
          </div>
          <StSliderBox>
            <StyledSlider {...settings}>
              {userInfo && userInfo.imgList.map((data, index) => {
                return (
                  <div className="imgBox" key={data.id} >
                    <img src={data.imgUrl} alt='img' id={data.id} className={index} onMouseEnter={onMouseEnterImgCounterHandler} />
                  </div>
                )
              })}
            </StyledSlider>
          </StSliderBox>
        </StFullScreen>
        :
        null
      }
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
  overflow-y: scroll;
`;

const StImg = styled.div`
  height: 100px;

  & img {
    width: 100%;
    height: 100px;
  }
`;

const StyledSlider = styled(Slider)`
  width:100%;
  height: 100%;
  width: 100%;
  position: relative;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }`;

const StSliderBox = styled.div`
  width:100%;
  height:600px;
  z-index:1000;
  padding-top:50px;
  box-sizing:border-box;
  
  & div.imgBox {
    width:100%;
    height:550px;

    img {
      width:100%;
      height:100%;
      background-size:contain;
    }
  }
`;


const StFullScreen = styled.div`
  width:100%;
  height:100vh;
  background-color: #111;
  z-index:999;
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



export default ProfilePhotos;
