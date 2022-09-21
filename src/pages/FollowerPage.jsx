import React from "react";
import styled from "styled-components";
import profileImgSvg from "../../src/assets/img/profileImgSvg.svg";
import arrow from "../assets/img/arrow.svg";

const FollowerPage = () => {
  return (
    <Stdiv>
      <StFollowtopBox>
        <div>
          <StarrowImg src={arrow} />
          <StTopText>팔로워 목록</StTopText>
        </div>
      </StFollowtopBox>

      <StFollowBox>
        <div>
          <StFollowProfile src={profileImgSvg} />
          <StFollowNickname>wowns740</StFollowNickname>
        </div>
        <StNotFollowBtn>
          팔로우
          <span>+</span>
        </StNotFollowBtn>
      </StFollowBox>
    </Stdiv>
  );
};

export default FollowerPage;

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

const StFollowtopBox = styled.div`
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
