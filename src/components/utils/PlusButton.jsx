import React from "react";
import styled from "styled-components";
import plusBottonSvg from "../../assets/img/plusBottonSvg.svg";

const PlusButton = () => {
  return <StPlusButton></StPlusButton>;
};

export default PlusButton;

const StPlusButton = styled.div`
  width: 50px;
  height: 50px;
  background-color: #ff8f27;
  border-radius: 200px;

  position: absolute;
  right: 5%;
  bottom: 13%;
`;
