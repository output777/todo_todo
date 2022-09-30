import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ProfilePhotos from "./ProfilePhotos";
import ProfilePlanner from "./ProfilePlanner";
import UploadPhoto from "./UploadPhoto";

const ProfileTabs = () => {
  const [change, setChange] = useState(true);
  const photoRef = useRef(null);
  const plannerRef = useRef(null);

  const onClickPhotoHandler = () => {
    photoRef.current.classList.add("active");
    plannerRef.current.classList.remove("active");
    setChange(true);
  };

  const onClickPlannerHandler = () => {
    photoRef.current.classList.remove("active");
    plannerRef.current.classList.add("active");
    setChange(false);
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
  z-index: 10;
  top: 0;
  background-color: white;
`;
const StTabPhoto = styled.div`
  flex: 1;
  display: felx;
  justify-content: center;
  align-items: center;
  border-top: 2px solid #e8e8e8;
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
  border-top: 2px solid #e8e8e8;
  border-bottom: 2px solid #e8e8e8;

  &.active {
    border-bottom: 2px solid #ff8f27;
  }
`;

export default ProfileTabs;
