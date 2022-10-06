import React, { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  __getTotalRate,
  __reset,
} from "../../redux/modules/mainSlice";
import {
  __getOtherInfo,
  __getFollowInfo,
  __getFollowingList,
  __getFollowCnt,
} from "../../redux/modules/mySlice";
import { __getRankScoreData } from "../../redux/modules/statisticsSlice";
import { useNavigate, useParams } from "react-router-dom";
import profileImgSvg from "../../assets/img/profileImgSvg.svg";
import arrow from "../../assets/img/arrow.svg";
import follwingcheck from "../../assets/img/followingcheck.svg";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const OtherProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const nickname = localStorage.getItem("nickname");

  const [follow, setFollow] = useState();
  const [month, setMonth] = useState(null);


  const user = useSelector((state) => state.my?.userInfo);
  const userRank = useSelector((state) => state.statistics?.rankScoreData);
  const userRate = useSelector((state) => state.main?.totalRate);
  const followingList = useSelector((state) => state.my.following);
  const { followcnt } = useSelector((state) => state.my);


  useEffect(() => {
    dispatch(__getRankScoreData(params.id));
    dispatch(__getTotalRate(params.id));
    dispatch(__getFollowingList(nickname));
    dispatch(__reset());
  }, []);



  useEffect(() => {
    if (followingList !== null && followingList.length > 0) {
      const followingListFunction = followingList.filter(
        (data) => data.nickname === params.id
      );
      if (followingListFunction.length > 0) {
        setFollow(() => true);
      } else {
        setFollow(() => false);
      }
    }
  }, [followingList]);

  const followerBtnHandler = async () => {
    await dispatch(__getFollowInfo(user.id));
    await dispatch(__getOtherInfo(params.id));
    setFollow(() => false);
  };

  const followBtnHandler = async () => {
    await dispatch(__getFollowInfo(user.id));
    await dispatch(__getOtherInfo(params.id));
    setFollow(() => true);
  };

  useEffect(() => {
    dispatch(__getOtherInfo(params.id));
  }, [dispatch]);

  const monthFunc = async () => {
    const { data } = await axios.get(`${BASE_URL}/month`);
    setMonth(() => data);
  };

  useEffect(() => {
    dispatch(__getFollowCnt(user.id));
  }, [dispatch, user]);

  useEffect(() => {
    monthFunc();
  }, []);

  if (!followcnt) {
    return <div></div>;
  }

  if (!user) {
    return <div></div>;
  }

  return (
    <>
      <StProfileContainer>
        <div className='title'>
          <img
            src={arrow}
            onClick={() => {
              navigate("/");
            }}
            alt='arrowImg'
          />
        </div>
        <StLine />
        <StImgInfoBox>
          <StImg>
            <img
              src={user.profileImage === "" ? profileImgSvg : user.profileImage}
              alt='profile'
            />
          </StImg>
          <StInfo>
            <div className='nextToPicture'>
              <span className='count'>
                {user.imgList === null ? 0 : user.imgList.length}
              </span>
              <span className='text'>게시물</span>
            </div>
            <div
              className='nextToPicture'
              onClick={() => {
                navigate(`/follower/${params.id}`);
              }}
            >
              <span className='count'>{followcnt.followerCnt}</span>
              <span className='text'>팔로워</span>
            </div>
            <div
              className='nextToPicture'
              onClick={() => {
                navigate(`/following/${params.id}`);
              }}
            >
              <span className='count'>{followcnt.followingCnt}</span>
              <span className='text'>팔로잉</span>
            </div>
          </StInfo>
        </StImgInfoBox>

        <StNameAndScore>
          <StStatusDiv>
            <div className='userName'>{user.nickname}</div>
            <div>{user.myMotto}</div>
          </StStatusDiv>
          <StScoreBox>
            <div>
              <p>
                {userRank[1].ranking === 0
                  ? "-위 "
                  : `${userRank[1].ranking}위 `}
                {userRank[1].score === 0
                  ? "-점"
                  : `${(userRank[1].score / 7).toFixed(2)}점`}
              </p>
              <p>주간 점수</p>
            </div>
            <div>
              <p>
                {userRank[2].ranking === 0
                  ? "-위 "
                  : `${userRank[2].ranking}위 `}
                {userRank[2].score === 0 ? "-점 " : `${((userRank[2].score / month) * 10).toFixed(2)}점`}
              </p>
              <p>월간 점수</p>
            </div>
            <div>
              <p>
                {userRate.achievementRate.toFixed(2)}%
              </p>
              <StAverageText>평균 달성률</StAverageText>
            </div>
          </StScoreBox>
        </StNameAndScore>

        {follow === true ? (
          <StFollowingBtn onClick={followerBtnHandler}>
            팔로잉
            <img src={follwingcheck} alt='follwingcheckImg' />
          </StFollowingBtn>
        ) : (
          <StNotFollowBtn onClick={followBtnHandler}>
            팔로우
            <span>+</span>
          </StNotFollowBtn>
        )}
      </StProfileContainer>
    </>
  );
};

const StStatusDiv = styled.div`
  width: 90%;
  margin: 0 10px 0 auto;
  .userName {
    font-weight: 1000;
  }
`;

const StLine = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: #f1f3f5;
`;

const StProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 380px;
  background-color: #fff;
  box-sizing: border-box;

  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-right: 1.5em;
    height: 50px;
    img {
      width: 15px;
      margin-left: 10px;
    }
  }
`;

const StImgInfoBox = styled.div`
  width: 90%;
  margin: 0 auto 0 auto;
  height: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StImg = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: relative;

  & img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  & div.rank {
    width: 70px;
    height: 20px;
    background-color: #e2eaff;
    color: #618af2;
    font-size: 0.7rem;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 0.1rem;
    text-align: center;
    position: absolute;
    bottom: -5px;
    left: 5px;
  }

  & div.editBox {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #ff7b00;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    position: absolute;
    bottom: 0;
    left: 60px;
  }

  & input {
    display: none;
  }
`;

const StInfo = styled.div`
  width: 70%;
  height: 80px;

  border-radius: 10px;
  font-size: 0.9rem;
  padding: 0.5rem 0.8rem;

  /* box-shadow: 0px 4px 15px 0px lightgray; */
  display: flex;
  justify-content: center;
  align-items: center;

  .nextToPicture {
    width: 30%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    .count {
      font-size: 1.2em;
      font-weight: bold;
    }
    .text {
      color: gray;
      font-weight: 7000;
    }
  }
`;

const StNotFollowBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  border: none;
  color: white;
  width: 140px;
  height: 40px;
  background: #ff8f27;
  border-radius: 16px;
  margin: 20px auto 0rem auto;
  span {
    padding: 0 0 4px 4px;
    font-size: 20px;
  }
`;

const StFollowingBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  border: none;
  color: #ff8f27;
  width: 140px;
  height: 40px;
  background: #fff3e8;
  border-radius: 16px;
  margin: 20px auto 0rem auto;
  img {
    padding: 0 0 0px 4px;
    font-size: 16px;
  }
`;

const StNameAndScore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StScoreBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 320px;
  height: 71px;

  background: #ffffff;

  border: 1px solid #ececec;
  border-radius: 16px;

  margin-top: 15px;

  padding: 0 10px;

  p {
    margin:0;
  }

  div {
    flex:1;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items:center;
    color: #9f9e9e;

    p:first-child {
      color: #ff7b00;
    }
  }
`;

const StAverageText = styled.div`
  position: relative;
  right: 5px;
`;

const StuserRate = styled.span`
  position: relative;
  left: 30px;
`;

const StMonthlyScoreText = styled.div`
  position: relative;
  right: 1px;
`;
export default OtherProfile;
