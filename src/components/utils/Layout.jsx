import React from "react";
import styled, { keyframes } from "styled-components";

const Layout = ({ children }) => {
  return <StLayout>{children}</StLayout>;
};

const layoutShow = keyframes`
  0% {
    display:block;
    opacity:0;
  }
  25% {
    display:block;
    opacity:0.25;
  }
  50% {
    display:block;
    opacity:0.5;
  }
  75% {
    display:block;
    opacity:0.75;
  }
  100% {
    display:block;
    opacity:1;
  }
`
const StLayout = styled.div`
  width:100%;
  min-width: 360px;
  height:100vh;
  background-color: #fafafa;
  position:relative;
  opacity:0;
  box-sizing:border-box;

  -ms-overflow-style: none;

  &::-webkit-scrollbar{
  display:none;
  }

  animation: ${layoutShow} 1s 5s alternate ease both;


@media screen and (min-width: 768px) {
    width:600px;
  }

`;

export default Layout;
