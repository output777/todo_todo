import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ProfilePhotos from "./ProfilePhotos";
import ProfilePlanner from "./ProfilePlanner";
import { useDispatch } from "react-redux";
import { displayNone } from "../../redux/modules/mySlice";

const ProfileTabs = () => {
  const dispatch = useDispatch();
  const [change, setChange] = useState(true);
  const photoRef = useRef(null);
  const plannerRef = useRef(null);

  const onClickPhotoHandler = () => {
    photoRef.current.classList.add("active");
    plannerRef.current.classList.remove("active");
    setChange(true);
    dispatch(displayNone("flex"));
  };

  const onClickPlannerHandler = () => {
    photoRef.current.classList.remove("active");
    plannerRef.current.classList.add("active");
    setChange(false);
    dispatch(displayNone("none"));
  };

  useEffect(() => {
    photoRef.current.classList.add("active");
  }, []);

  return (
    <>
      <StTabsTitle>
        <StTabPhoto onClick={onClickPhotoHandler} ref={photoRef}>
          사진
        </StTabPhoto>
        <StTabPlanner onClick={onClickPlannerHandler} ref={plannerRef}>
          플래너
        </StTabPlanner>
      </StTabsTitle>
      {change ? (
        <>
          <ProfilePhotos />
        </>
      ) : (
        <ProfilePlanner />
      )}
    </>
  );
};

const StTabsTitle = styled.div`
  display: flex;
  height: 45px;
  position: sticky;
  z-index: 1;
  top: 0;
  background-color: white;
  font-size: 16px;
  font-weight: 600;
  color: #767676;
`;
const StTabPhoto = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #e8e8e8;
  border-bottom: 2px solid #e8e8e8;

  &.active {
    border-bottom: 2px solid #ff8f27;
  }
`;

const StTabPlanner = styled.div`
  flex: 1;
  display: felx;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #e8e8e8;
  border-bottom: 2px solid #e8e8e8;

  &.active {
    border-bottom: 2px solid #ff8f27;
  }
`;

export default ProfileTabs;
