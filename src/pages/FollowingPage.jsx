import React from "react";
import styled from "styled-components";
import FollowList from "../components/follow/FollowList";

const FollowingPage = () => {
  return (
    <StContainer>
      <FollowList />
    </StContainer>
  )
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

export default FollowingPage;
