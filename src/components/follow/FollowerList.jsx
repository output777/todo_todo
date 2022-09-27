import React, { useState, useEffect } from "react";
import styled from "styled-components";
import profileImgSvg from "../../assets/img/profileImgSvg.svg";
import arrow from "../../assets/img/arrow.svg";
import follwingcheck from "../../assets/img/followingcheck.svg";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  __getFollowerList,
  __getFollowingList,
  __getFollowInfo,
  __getOtherInfo,
} from "../../redux/modules/mySlice";

const FollowerList = () => {
  const nickname = localStorage.getItem("nickname");

  const [follow, setFollow] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const followerList = useSelector((state) => state.my?.follower);
  console.log(followerList);

  const myfollowingList = useSelector((state) => state.my?.following);
  console.log(myfollowingList);

  const params = useParams();

  const followerBtnHandler = async (id) => {
    await dispatch(__getFollowInfo(id));
    setFollow(() => false);
  };

  const followBtnHandler = async (id) => {
    await dispatch(__getFollowInfo(id));
    setFollow(() => true);
  };

  useEffect(() => {
    dispatch(__getFollowerList(params.id));
    dispatch(__getFollowingList(nickname));
  }, []);

  return (
    <Stdiv>
      <StFollowtopBox>
        <div>
          <StarrowImg
            src={arrow}
            onClick={() => {
              navigate(-1);
            }}
          />
          <StTopText>팔로워 목록</StTopText>
        </div>
      </StFollowtopBox>

      {followerList?.map((member) => (
        <StFollowBox
          key={member.id}
          onClick={() => {
            if (member.nickname == nickname) {
              navigate("/my");
            } else {
              navigate(`/othermy/${member.nickname}`);
            }
          }}
        >
          <div>
            <StFollowProfile src={member.profileImage} />
            <StFollowNickname>{member.nickname}</StFollowNickname>
          </div>

          {nickname == member.nickname ? (
            <div></div>
          ) : nickname !== member.nickname &&
            myfollowingList?.find((v) => v.nickname === member.nickname) ? (
            <StFollowingBtn
              onClick={(event) => {
                event.stopPropagation();
                followerBtnHandler(member.id);
              }}
            >
              팔로잉
              <img src={follwingcheck} alt='' />
            </StFollowingBtn>
          ) : (
            <StNotFollowBtn
              onClick={(event) => {
                event.stopPropagation();
                followBtnHandler(member.id);
              }}
            >
              팔로우
              <span>+</span>
            </StNotFollowBtn>
          )}
        </StFollowBox>
      ))}
    </Stdiv>
  );
};

export default FollowerList;

const Stdiv = styled.div`
  background-color: #fafafa;
`;

const StFollowBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 90%;
  margin: auto;
  /* height: 70px; */
  height: 4.5em;

  background: #ffffff;

  box-shadow: 0px 4px 15px rgba(17, 17, 17, 0.05);
  border-radius: 19px;

  margin-top: 12px;
  padding-left: 15px;
  padding-right: 15px;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1.5em;

    & div {
      gap: 0.6em;
    }
  }
`;

const StFollowProfile = styled.img`
  width: 45px;
  height: 45px;
  background-color: #eee;
  border-radius: 100px;
  object-fit: cover;
`;

const StFollowNickname = styled.div`
  padding-left: 10px;
`;

const StNotFollowBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  border: none;
  color: white;
  width: 100px;
  height: 38px;
  background: #ff8f27;
  border-radius: 16px;
  span {
    padding: 0 0 4px 4px;
    font-size: 20px;
  }
`;

const StFollowingBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  border: none;
  color: #ff8f27;
  width: 100px;
  height: 38px;
  background: #fff3e8;
  border-radius: 16px;
  img {
    padding: 0 0 0px 4px;
    font-size: 16px;
  }
`;

const StFollowtopBox = styled.div`
  position: sticky;
  top: 0;
  background-color: #ffffff;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StarrowImg = styled.img`
  position: relative;
  top: 20px;
  right: 100px;
`;

const StTopText = styled.span`
  font-weight: bold;
  position: relative;
  top: 20px;
`;
