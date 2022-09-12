import React from "react";
import Layout from "../components/utils/Layout";
import Main from "../components/mainPage/Main";
import InfiniteScroll from "../components/mainPage/InfiniteScroll";
import Navbar from "../components/utils/Navbar";

const MainPage = () => {
  return (
    <Layout>
      <Main />
      <InfiniteScroll />
      <Navbar />
    </Layout>
  );
};

export default MainPage;
