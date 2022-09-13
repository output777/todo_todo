import React from "react";
import styled from "styled-components";

const Layout = ({ children }) => {
  return <StLayout>{children}</StLayout>;
};

const StLayout = styled.div`
  width: 100%;
  min-width: 360px;
  height: 90vh;
  margin: 0 auto;
`;

export default Layout;
