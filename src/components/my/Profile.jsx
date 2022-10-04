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
  __getFollowCnt,
} from "../../redux/modules/mySlice";
import logoPencil from "../../assets/img/loginPage/logoPencil.svg";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import settingSvg from "../../assets/img/myPage/settingSvg.svg";
import defaultProfile from "../../assets/img/defaultProfile.jpg";
import profileImgSvg from "../../assets/img/profileImgSvg.svg";
import Setting from "./Setting";
import ProfileTabs from "./ProfileTabs";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.my);
  const { images } = useSelector((state) => state.my);
  console.log("userInfo", userInfo);
  const { profileImage } = useSelector((state) => state.my);
  const { motto } = useSelector((state) => state.my);
  const { followcnt } = useSelector((state) => state.my);
  console.log(followcnt);

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

  useEffect(() => {
    dispatch(__getFollowCnt(userInfo.id));
  }, [dispatch, userInfo]);

  const handleImgError = (e) => {
    e.target.src = profileImgSvg;
  };

  return (
    <StContainer>
      <StProfileContainer>
        <div className="titleDiv">
          <div className="title">마이페이지</div>
          <img
            src={settingSvg}
            onClick={() => {
              navigate("/setting");
            }}
            alt="settingImg"
          />
        </div>
        <StLine></StLine>
        <StImgInfoBox>
          <StImg>
            <img
              src={
                userInfo?.profileImage === null ||
                userInfo?.profileImage === "null"
                  ? profileImgSvg
                  : userInfo?.profileImage
              }
              alt="profileImage"
              onError={handleImgError}
            />
          </StImg>
          <StInfo>
            <div className="nextToPicture">
              <span className="count">
                {images === null || images.errorMessage !== undefined
                  ? 0
                  : images.length}
              </span>
              <span className="text">사진</span>
            </div>
            <div
              className="nextToPicture"
              onClick={() => {
                navigate(`/follower/${nickname}`);
              }}
            >
              <span className="count">
                {followcnt?.followerCnt === null ? 0 : followcnt?.followerCnt}
              </span>
              <span className="text">팔로워</span>
            </div>
            <div
              className="nextToPicture"
              onClick={() => {
                navigate(`/following/${nickname}`);
              }}
            >
              <span className="count">
                {followcnt?.followingCnt === null ? 0 : followcnt?.followingCnt}
              </span>
              <span className="text">팔로잉</span>
            </div>
          </StInfo>
        </StImgInfoBox>
        <StStatusDiv>
          <div className="userName">
            {nickname == null || nickname === "null" ? "" : nickname}
          </div>
          <div className="myMotto">
            {userInfo?.myMotto == null ? "" : userInfo?.myMotto}
          </div>
        </StStatusDiv>

        <StBtn
          onClick={() => {
            navigate("/profileedit");
          }}
        >
          프로필 편집
        </StBtn>
      </StProfileContainer>
      <ProfileTabs />
    </StContainer>
  );
};

const StContainer = styled.div`
  height: 100%;
  overflow: hidden auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StStatusDiv = styled.div`
  width: 90%;
  padding: auto;
  margin: 14px auto 0 22px;
  .userName {
    font-size: 18px;
    font-weight: bold;
  }
  .myMotto {
    margin-top: 4px;
    font-size: 14px;
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
  height: 375px;
  box-sizing: border-box;
  background-color: #fff;

  .titleDiv {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;

    height: 120px;
    background-color: #fff;
    color: black;
    padding: 0 26.82px 0 22px;

    .title {
      height: auto;
      margin: 0px;
      font-size: 24px;
      font-weight: bold;
      padding-bottom: 15px;
    }
    img {
      width: 21.37px;
      height: 20.62px;
      padding-bottom: 22.21px;
    }
  }
`;

const StImgInfoBox = styled.div`
  height: auto;
  display: flex;
  align-items: center;
`;

const StImg = styled.div`
  width: auto;
  height: 86px;
  border-radius: 100px;
  position: relative;
  margin: 10px 0 0 22px;

  img {
    width: 86px;
    height: 86px;
    border-radius: 100px;
    object-fit: cover;
  }

  /* & div.rank {
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
  } */

  /* & div.editBox {
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
  } */

  /* & input {
    display: none;
  } */
`;

const StInfo = styled.div`
  width: 201px;
  height: 60px;
  border-radius: 10px;
  margin-left: 31px;
  display: flex;
  flex-direction: row;
  align-items: center;

  .nextToPicture {
    width: 57px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    .count {
      font-size: 15px;
      font-weight: bold;
    }
    .text {
      font-size: 13px;
      color: gray;
      font-weight: 7000;
    }
  }
`;

const StBtn = styled.button`
  width: 140px;
  height: 38px;
  color: black;
  font-size: 16px;
  font-weight: 600;
  background-color: #f8f8f8;
  border-radius: 16px;
  border: none;
  margin: 16px auto;
`;

export default Profile;
