import React from "react";
import styled from "styled-components";
import plusButtonSvg from "../../assets/img/plusButtonSvg.svg";

const PlusButton = ({ onClick }) => {
  return <StPlusButton src={plusButtonSvg} onClick={onClick} />;
};

export default PlusButton;

const StPlusButton = styled.img`
  position: fixed;
  /* float: right; */
  right: 3%;
  bottom: 10%;
`;
