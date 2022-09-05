import React from "react";
import styled from "styled-components";
import plusBottonSvg from "../../assets/img/plusBottonSvg.svg";

const PlusButton = () => {
  return <StPlusButton src={plusBottonSvg} />;
};

export default PlusButton;

const StPlusButton = styled.img`
  position: fixed;
  /* float: right; */
  right: 3%;
  bottom: 10%;
`;
