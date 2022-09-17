import React from "react";
import Layout from "../components/utils/Layout";
import Main from "../components/main/Main";
import InfiniteScroll from "../components/main/InfiniteScroll";
import Navbar from "../components/utils/Navbar";

const MainPage = () => {
  return (
    <>
      <Main />
      <Navbar home={true} />
    </>
  );
};

export default MainPage;
