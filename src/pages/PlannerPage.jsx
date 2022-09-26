import React from "react";
import Navbar from "../components/utils/Navbar";
import styled from "styled-components";
import PlannerCategory from "../components/planner/PlannerCategory";

const PlannerPage = () => {

  return (
    <>
      {/* <Planner /> */}
      <PlannerCategory />
      <Navbar planner={true} />
    </>
  );
};

export default PlannerPage;

const Stdiv = styled.div`
  background-color: #fafafa;
  height: 100vh;
`;
