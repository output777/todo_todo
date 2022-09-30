import React from "react";
import styled from "styled-components";

const Layout = ({ children }) => {
  return <StLayout>{children}</StLayout>;
};

const StLayout = styled.div`
  width:100%;
  max-width:416px;
  min-width: 360px;
  height: 850px;

  position:relative;
  background-color: #fafafa;
  -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    .box::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
}

`;

export default Layout;
