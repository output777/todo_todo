import React from "react";
import styled from "styled-components";
import Profile from "../components/my/Profile";
import ProfileTabs from "../components/my/ProfileTabs";
import Navbar from "../components/utils/Navbar";
import UploadPhoto from "../components/my/UploadPhoto";

const MyPage = () => {
  return (
    <StContainer>
      <Profile />
      <ProfileTabs />
      <Navbar myPage={true} />
    </StContainer>
  );
};

const StContainer = styled.div`
  height: 90vh;
  position: relative;
  font-family: "SUIT-Regular", sans-serif;
`;

export default MyPage;
