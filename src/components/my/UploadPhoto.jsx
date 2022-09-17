import React from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import cameraSvg from "../../assets/img/cameraSvg.svg";

import {
  __getImages,
  __postImages,
  __getMyInfo,
} from "../../redux/modules/mySlice";

const UploadPhoto = () => {
  const dispatch = useDispatch();
  const uploadRef = useRef(null);

  const onClickUploadPhotoHandler = () => {
    uploadRef.current.click();
  };

  const onChangeUploadImageHandler = async (e) => {
    if (!e.target.files) {
      return;
    }

    const formData = new FormData();
    formData.append("multipartFile", e.target.files[0]);

    // 사진 업로드 했을 때 유저 정보에 사진 이미지가 바로 입력안됨
    // 그래서 id값을 바로 가질 수 없어서 해결해야 함
    await dispatch(__postImages(formData));
    await dispatch(__getImages());
    await dispatch(__getMyInfo());

    console.log(e.target.files);
    console.log(e.target.files[0].name);
  };

  return (
    <StUploadPhoto onClick={onClickUploadPhotoHandler}>
      <input
        type='file'
        accept='image/*'
        ref={uploadRef}
        onChange={onChangeUploadImageHandler}
      />
      <img src={cameraSvg} alt='camera' />
    </StUploadPhoto>
  );
};

const StUploadPhoto = styled.div`
  width: 58px;
  height: 58px;
  background-color: #ff8f27;
  border-radius: 50%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 26px;
  bottom: 100px;
  cursor: pointer;

  & input {
    display: none;
  }
`;

export default UploadPhoto;
