import React from "react";
import styled from "styled-components";

const Layout = ({ children }) => {
  return <StLayout>{children}</StLayout>;
};

const StLayout = styled.div`
width:100%;
  /* width:416px; */
  min-width: 360px;
  height:850px;
  background-color: #fafafa;
  position:relative;

  

  -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    .box::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
}

  @media screen and (min-width: 768px) {
    width:600px;
  }

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

export default Layout;
