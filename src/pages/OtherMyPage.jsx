import React from "react";
import styled from "styled-components";
import OtherProfile from "../components/othermy/OtherProfile";
import OtherProfileTabs from "../components/othermy/OtherProfileTabs";

const MyPage = () => {
  return (
    <StContainer>
      <OtherProfile />
      {/* <OtherProfileTabs /> */}
    </StContainer>
  );
};

const StContainer = styled.div`
  height: 90vh;
  position: relative;
  font-family: "SUIT-Regular", sans-serif;
`;

export default MyPage;
