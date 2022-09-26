import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { __getMainRank } from "../../redux/modules/mainSlice";
import profileImgSvg from "../../assets/img/profileImgSvg.svg";
import { useNavigate } from "react-router-dom";

const InfiniteScroll = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mainRankList } = useSelector((state) => state.main);
  const { error } = useSelector((state) => state.main);

  console.log("mainRankList", mainRankList);

  let nickname = localStorage.getItem("nickname");
  const targetRef = useRef(null);
  const [page, setPage] = useState(0);

  const checkIntersect = ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      setPage((prev) => prev + 1);
    }
  };

  // nav누른다음에 가면 0페이지는 호출하지만 0페이지가 화면에 적용 안되는 상황이 발생함
  useEffect(() => {
    dispatch(__getMainRank(page));
  }, [page]);

  useEffect(() => {
    let observer;
    if (targetRef) {
      observer = new IntersectionObserver(checkIntersect, {
        threshold: 0.5,
      });
      observer.observe(targetRef.current);
    }
    return () => {
      observer && observer.disconnect();
    };
  }, [mainRankList]);


  return (
    <Stdiv>
      {mainRankList.map((each) => (
        <StRankingBox
          key={each.id}
          onClick={() => {
            if (nickname === each.nickname) {
              navigate(`/my`);
            } else {
              navigate(`/othermy/${each.nickname}`);
            }
          }}
        >
          <div>
            <StRankingNumber>{each.rank}</StRankingNumber>
            <div>
              <StRankingProfile src={profileImgSvg} />
              <StRankingNickname>{each.nickname}</StRankingNickname>
            </div>
          </div>

          <StRankingScore>{Math.round(each.achievementRate)}</StRankingScore>
        </StRankingBox>
      ))}
      <StRefDiv ref={targetRef}>{error}</StRefDiv>
    </Stdiv>
  );
};

export default InfiniteScroll;

const Stdiv = styled.div`
  background-color: #fafafa;
  /* background-color: gray; */
  /* height: 35vh; */
  /* overflow: scroll; */
`;
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

  width: 90%;
  margin: auto;
  /* height: 70px; */
  height: 4.5em;

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
    gap: 1.5em;

    & div {
      gap: 0.6em;
    }
  }
`;

const StRankingNumber = styled.div`
  font-weight: 700;
  font-size: 15px;
  color: #ff7b00;
  margin-left: 1em;
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
  margin-right: 1em;
`;
