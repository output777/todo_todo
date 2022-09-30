import React from "react";
import styled from "styled-components";
import { useState } from "react";
import cameraSvg from "../../assets/img/cameraSvg.svg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  __getMyInfo,
  __postProfileImg,
  __postProfileMoto,
} from "../../redux/modules/mySlice";
import logoPencil from "../../assets/img/loginPage/logoPencil.svg";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import settingSvg from "../../assets/img/myPage/settingSvg.svg";
import defaultProfile from "../../assets/img/defaultProfile.jpg";
import profileImgSvg from "../../assets/img/profileImgSvg.svg";
import Setting from "./Setting";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.my);
  const { images } = useSelector((state) => state.my);
  console.log("userInfo", userInfo);
  const { profileImage } = useSelector((state) => state.my);
  const { motto } = useSelector((state) => state.my);

  const [edit, setEdit] = useState(false);
  const [mottoInput, setmottoInput] = useState("");

  const uploadProfileRef = useRef(null);
  const motoFormRef = useRef(null);
  const mottoInputRef = useRef(null);
  const motoRef = useRef(null);
  const motoImgRef = useRef(null);

  useEffect(() => {
    setmottoInput(motto);
  }, [setmottoInput, motto]);

  const nickname = localStorage.getItem("nickname");

  useEffect(() => {
    dispatch(__getMyInfo(nickname));
  }, [profileImage]);

  const handleImgError = (e) => {
    e.target.src = profileImgSvg;
  };

  return (
    <>
      <StProfileContainer>
        <div className='title'>
          <h3 style={{ fontSize: "22px", fontWeight: "bold", margin: "5% 7%" }}>
            마이페이지
          </h3>
          <img
            src={settingSvg}
            onClick={() => {
              navigate("/setting");
            }}
          />
        </div>
        <StLine></StLine>
        <StImgInfoBox>
          <StImg>
            <img
              src={
                userInfo?.profileImage == null ||
                userInfo?.profileImage == "null"
                  ? profileImgSvg
                  : userInfo?.profileImage
              }
              alt='profileImage'
              onError={handleImgError}
            />
          </StImg>
          <StInfo>
            <div className='nextToPicture'>
              <span className='count'>
                {images === null || images.errorMessage !== undefined
                  ? 0
                  : images.length}
              </span>
              <span className='text'>사진</span>
            </div>
            <div
              className='nextToPicture'
              onClick={() => {
                navigate(`/follower/${nickname}`);
              }}
            >
              <span className='count'>{userInfo?.followersCnt}</span>
              <span className='text'>팔로워</span>
            </div>
            <div
              className='nextToPicture'
              onClick={() => {
                navigate(`/following/${nickname}`);
              }}
            >
              <span className='count'>{userInfo?.followingsCnt}</span>
              <span className='text'>팔로잉</span>
            </div>
          </StInfo>
        </StImgInfoBox>
        <StStatusDiv>
          <div className='userName'>
            {nickname == null || nickname === "null" ? "" : nickname}
          </div>
          <div>{userInfo?.myMotto == null ? "" : userInfo?.myMotto}</div>
        </StStatusDiv>

        <StBtn
          onClick={() => {
            navigate("/profileedit");
          }}
        >
          프로필 편집
        </StBtn>
      </StProfileContainer>
    </>
  );
};

const StStatusDiv = styled.div`
  width: 90%;
  padding-top: 10px;
  padding-left: 5%;
  margin: 0.3em auto 0 auto;
  .userName {
    font-weight: 1000;
  }
`;

const StLine = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: #f1f3f5;
`;

const StProfileContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 350px;
  box-sizing: border-box;

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-right: 1.5em;
    height: 72px;
  }
`;

const StImgInfoBox = styled.div`
  width: 90%;
  margin: 1em auto 0 auto;
  height: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StImg = styled.div`
  width: auto;
  height: auto;
  border-radius: 100px;
  position: relative;

  & img {
    width: 6em;
    height: 6em;
    border-radius: 100px;
    /* object-fit: contain; */
  }

  & div.rank {
    width: 70px;
    height: 20px;
    background-color: #e2eaff;
    color: #618af2;
    font-size: 0.7rem;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 0.1rem;
    text-align: center;
    position: absolute;
    bottom: -5px;
    left: 5px;
  }

  & div.editBox {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #ff7b00;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    position: absolute;
    bottom: 0;
    left: 60px;
  }

  & input {
    display: none;
  }
`;

const StInfo = styled.div`
  width: 70%;
  height: 80px;

  border-radius: 10px;
  font-size: 0.9rem;
  padding: 0.5rem 0.8rem;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .nextToPicture {
    width: 30%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    .count {
      font-size: 1.2em;
      font-weight: bold;
    }
    .text {
      color: gray;
      font-weight: 7000;
    }
  }
`;

const StBtn = styled.button`
  position: absolute;
  bottom: 10px;
  left: 25%;
  width: 50%;
  height: 40px;
  background-color: #f8f8f8;
  border-radius: 16px;
  border: none;
  margin: 15px auto 0rem auto;
`;

export default Profile;
