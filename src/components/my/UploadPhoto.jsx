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
import imageCompression from "browser-image-compression";

const UploadPhoto = () => {
  const dispatch = useDispatch();
  const uploadRef = useRef(null);
  const nickname = localStorage.getItem("nickname");
  console.log("nickname", nickname);

  const onClickUploadPhotoHandler = () => {
    uploadRef.current.click();
  };

  const onChangeUploadImageHandler = async (e) => {
    if (!e.target.files) {
      return;
    }

    const imageFile = e.target.files[0];
    console.log("imageFile", imageFile);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log(`compressedFile.size ${compressedFile.size}`);

      // await uploadToServer(compressedFile);
      const formData = new FormData();
      formData.append("multipartFile", compressedFile);

      await dispatch(__postImages(formData));
      await dispatch(__getImages(nickname));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StUploadPhoto onClick={onClickUploadPhotoHandler}>
      <input
        type="file"
        accept="image/*"
        ref={uploadRef}
        onChange={onChangeUploadImageHandler}
      />
      <img src={cameraSvg} alt="camera" />
    </StUploadPhoto>
  );
};

const StUploadPhoto = styled.div`
  position: fixed;
  bottom: 5.5rem;
  right: 1rem;
  z-index: 4;

  width: 58px;
  height: 58px;
  background-color: #ff8f27;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* right: 18px; */
  /* top: 7px; */
  cursor: pointer;

  & input {
    display: none;
  }
`;

export default UploadPhoto;
