import React from "react";
import Main from "../components/main/Main";
import InfiniteScroll from "../components/main/InfiniteScroll";
import Navbar from "../components/utils/Navbar";
import Layout from "../components/utils/Layout";
import styled from "styled-components";

const MainPage = () => {
  return (
    // <StContainer>
    // <Layout>
    <>
      <Main />
      <Navbar home={true} />
    </>
    // </Layout>
    // </StContainer>
  );
};


const StContainer = styled.div`
  width:100vw;
  height:850px;
  display: flex;
  background-color: #fafafa;
  justify-content:center;
  box-sizing:border-box;


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
`

export default MainPage;
