import React from "react";
import styled from "styled-components";
import Profile from "../components/my/Profile";
import ProfileTabs from "../components/my/ProfileTabs";
import Navbar from "../components/utils/Navbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { __reset } from "../redux/modules/mainSlice";
import Layout from "../components/utils/Layout";
import UploadPhoto from "../components/my/UploadPhoto";

const MyPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__reset());
  }, []);

  return (
    <StContainer>
      <Profile />
      <ProfileTabs />
      <UploadPhoto />
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
