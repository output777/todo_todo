import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { __getMainRank } from "../../redux/modules/mainSlice";
import defaultProfile from "../../assets/img/defaultProfile.jpg";

const InfiniteScroll = () => {
  const { mainRankList } = useSelector((state) => state.mainSlice);
  const { error } = useSelector((state) => state.mainSlice);
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

  useEffect(() => {
    let observer;
    if (targetRef) {
      observer = new IntersectionObserver(checkIntersect, {
        threshold: 0.5,
      });
      observer.observe(targetRef.current);
    }
  }, [mainRankList]);

  return (
    <div>
      {mainRankList.map((each) => (
        <StRankingBox key={each.id}>
          <StRankingNumber>100</StRankingNumber>
          <div>
            <StRankingProfile src={defaultProfile} />
            <StRankingNickname>{each.nickName}</StRankingNickname>
          </div>

          <StRankingScore>30000</StRankingScore>
        </StRankingBox>
      ))}
      <StRefDiv ref={targetRef}>{error}</StRefDiv>
    </div>
  );
};

export default InfiniteScroll;

const StRefDiv = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StRankingBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 350px;
  height: 70px;

  background: #ffffff;

  box-shadow: 0px 4px 15px rgba(17, 17, 17, 0.05);
  border-radius: 19px;

  margin-top: 12px;
  padding-left: 15px;
  padding-right: 15px;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
`;

const StRankingNumber = styled.div`
  font-weight: 700;
  font-size: 15px;
  color: #ff7b00;
`;

const StRankingProfile = styled.img`
  width: 45px;
  height: 45px;
  background-color: #eee;
  border-radius: 100px;
  object-fit: cover;
`;

const StRankingNickname = styled.div``;

const StRankingScore = styled.div`
  font-weight: 700;
  color: #9f9e9e;
`;
