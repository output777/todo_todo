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
    // <StContainer>
    // <Layout>
    <>
      <Profile />
      <ProfileTabs />
      <UploadPhoto />
      <Navbar myPage={true} />
    </>
    // </Layout>
    // </StContainer>
  );
};

const StContainer = styled.div`
  /* width:100vw; */
  height:850px;
  display: flex;
  justify-content:center;
  box-sizing:border-box;
  position: relative;
  font-family: "SUIT-Regular", sans-serif;

  @media screen and (min-height: 850px) {
  height:1180px;
  }

  @media screen and (min-height: 915px) {
  height:1024px;
  }

  @media screen and (min-height: 1024px) {
  height:1180px;
  }
  @media screen and (min-height: 1180px) {
  height:1366px;
  }
`;

export default MyPage;
