import React, { useEffect } from "react";
import Navbar from "../components/utils/Navbar";
import PlannerCategory from "../components/planner/PlannerCategory";
import { useDispatch } from "react-redux";
import { __reset } from "../redux/modules/mainSlice";
import Layout from "../components/utils/Layout";
import styled from "styled-components";

const PlannerPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__reset())
  }, [])

  return (
    // <StContainer>
    // <Layout>
    <StContainer>
      <PlannerCategory />
      <Navbar planner={true} />
    </StContainer>
    // </Layout>
    // </StContainer>
  );
};

const StContainer = styled.div`
  width:100%;
  height:100%;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  background-color: #fafafa;
  justify-content:center;
  box-sizing:border-box;


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
`

export default PlannerPage;

