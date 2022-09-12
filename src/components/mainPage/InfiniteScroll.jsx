import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { __getMainRank } from "../../redux/modules/mainSlice";

const InfiniteScroll = () => {
  const { mainRankList } = useSelector((state) => state.mainSlice);
  const dispatch = useDispatch();
  const targetRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false); // 로드 true, false
  const [page, setPage] = useState(1); // 페이지
  let options = {
    root: null,
    threshold: 0.5,
  };

  const checkIntersect = useCallback(
    ([entry], observer) => {
      if (entry.isIntersecting && !isLoaded) {
        dispatch(__getMainRank(page)); // size도 payload로 보내기

        observer.unobserve(entry.target);
        setPage((prev) => prev + 1);
      }
    },
    [mainRankList]
  );
  console.log("mainRankList", mainRankList);

  useEffect(() => {
    let observer;
    if (targetRef) {
      observer = new IntersectionObserver(checkIntersect, {
        threshold: 0.5,
      });
      observer.observe(targetRef.current);
    }
  }, [mainRankList]);

  console.log("page", page);

  return (
    <div>
      {mainRankList.map((each) => (
        <StDiv key={each.id}>{each.title}</StDiv>
      ))}
      <StRefDiv ref={targetRef}></StRefDiv>
    </div>
  );
};

export default InfiniteScroll;

const StDiv = styled.div`
  width: 90%;
  margin: 10px auto 10px auto;
  height: 65px;
  box-shadow: 0px 4px 15px rgba(17, 17, 17, 0.05);
  border-radius: 19px;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StRefDiv = styled.div`
  height: 50px;
`;
