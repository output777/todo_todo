import React from "react";
import styled, { keyframes } from "styled-components";



const Layout = ({ children }) => {
  return <StLayout>{children}</StLayout>;
};

const StLayout = styled.div`
  width:100%;
  min-width: 360px;
  height: 100vh;
  background-color: #fafafa;
  position:relative;
  opacity:1;
  box-sizing:border-box;

  -ms-overflow-style: none;

  &::-webkit-scrollbar{
  display:none;
  }



@media screen and (min-width: 768px) {
    width:600px;
  }


`;

export default Layout;
