import React from "react";
import styled from "styled-components";
import Profile from "../components/my/Profile";
import ProfileTabs from "../components/my/ProfileTabs";
import Navbar from "../components/utils/Navbar";
import UploadPhoto from "../components/my/UploadPhoto";

const MyPage = () => {
  return (
    <StContainer>
      {/* <ProfileCalender /> */}
      <Profile />
      <ProfileTabs />
      <Navbar />
      <UploadPhoto />
    </StContainer>
  );
};

const StContainer = styled.div`
  height: 90vh;
  position: relative;
`;

export default MyPage;
