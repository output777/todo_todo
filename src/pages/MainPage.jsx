import React from "react";
import Layout from "../components/utils/Layout";
import Main from "../components/mainPage/Main";
import InfiniteScroll from "../components/mainPage/InfiniteScroll";

const MainPage = () => {
  return (
    <Layout>
      <Main />
      <InfiniteScroll />
    </Layout>
  );
};

export default MainPage;
