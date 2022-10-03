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
  /* overflow:hidden auto; */
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

  /* @media screen and (min-height: 667px) {
  height:667px;
  }
  @media screen and (min-height: 736px) {
  height:736px;
  }

  @media screen and (min-height: 740px) {
  height:740px;
  }

  @media screen and (min-height: 800px) {
  height:800px;
  }

  @media screen and (min-height: 812px) {
  height:812px;
  }

  @media screen and (min-height: 844px) {
  height:844px;
  }

  @media screen and (min-height: 851px) {
  height:851px;
  }

@media screen and (min-height: 896px) {
  height:896px;
  }

  @media screen and (min-height: 915px) {
  height:915px;
  }

  @media screen and (min-height: 1024px) {
  height:1024px;
  }

  @media screen and (min-height: 1180px) {
  height:1180px;
  }

  @media screen and (min-height: 1366px) {
  height:1366px;
  } */



`;

export default Layout;
