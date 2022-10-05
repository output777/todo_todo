import React from "react";
import styled from "styled-components";
import OtherProfile from "../components/othermy/OtherProfile";
import OtherProfileTabs from "../components/othermy/OtherProfileTabs";

const MyPage = () => {
  return (
    <StContainer>
      <OtherProfile />
      <OtherProfileTabs />
    </StContainer>
  );
};

const StContainer = styled.div`
  width:100%;
  height:100%;
  overflow:hidden auto;
  box-sizing:border-box;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (min-width: 768px) {
    width:600px;
  }

`


export default MyPage;
