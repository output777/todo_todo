import React from 'react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import cameraSvg from '../../assets/img/cameraSvg.svg'
import { __getImages, __postImages } from '../../redux/modules/mySlice'

const UploadPhoto = () => {
  const dispatch = useDispatch();
  const uploadRef = useRef(null);

  const onClickUploadPhotoHandler = () => {
    uploadRef.current.click();
  }

  const onChangeUploadImageHandler = async (e) => {
    if (!e.target.files) {
      return;
    }

    const formData = new FormData();
    formData.append('multipartFile', e.target.files[0])

    await dispatch(__postImages(formData));
    await dispatch(__getImages());

    console.log(e.target.files);
    console.log(e.target.files[0].name);
  }

  return (
    <StUploadPhoto onClick={onClickUploadPhotoHandler}>
      <input type='file' accept='image/*' ref={uploadRef} onChange={onChangeUploadImageHandler} />
      <img src={cameraSvg} alt='camera' />
    </StUploadPhoto>
  )
}

const StUploadPhoto = styled.div`
  width: 70px;
  height: 70px;
  background-color: #FF8F27;
  border-radius:50%;
  position: fixed;
  display: flex;
  justify-content:center;
  align-items:center;
  right:16px;
  bottom: 70px;
  cursor:pointer;

  & input {
    display: none;
  }
`

export default UploadPhoto