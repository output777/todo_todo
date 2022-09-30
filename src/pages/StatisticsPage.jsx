import React, { useEffect } from "react";
import Navbar from "../components/utils/Navbar";
import Statistics from "../components/statistics/Statistics";
import { useDispatch } from "react-redux";
import { __reset } from "../redux/modules/mainSlice";
import Layout from "../components/utils/Layout";
import styled from "styled-components";

const StatisticsPage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__reset())
  }, [])

  return (
    <StContainer>
      <Layout>
        <Statistics />
        <Navbar statistics={true} />
      </Layout>
    </StContainer>
  );
};

const StContainer = styled.div`
  width:100vw;
  height:850px;
  display: flex;
  justify-content:center;
  box-sizing:border-box;
  
  @media screen and (min-height: 850px) {
  height:1180px;
  }

    @media screen and (min-height: 915px) {
  height:1024px;
  }

  @media screen and (min-height: 1024px) {
  height:1180px;
  }
  @media screen and (min-height: 1180px) {
  height:1366px;
  }
`

export default StatisticsPage;
