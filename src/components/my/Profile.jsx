import React from 'react'
import styled from 'styled-components';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useState } from 'react';
import cameraSvg from '../../assets/img/cameraSvg.svg'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getMyInfo, __postProfileImg } from '../../redux/modules/mySlice';
import logoPencil from '../../assets/img/loginPage/logoPencil.svg'
import { useRef } from 'react';

const Profile = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  const uploadProfileRef = useRef(null);
  const { userInfo } = useSelector((state) => state.my)
  console.log('userInfo', userInfo);

  const onClickEditHandler = () => {
    setEdit(true);
  }

  const onClickCompleteHandler = () => {
    setEdit(false);
  }

  const onChangeUploadProfileImageHandler = (e) => {
    if (!e.target.files) {
      return;
    }

    const formData = new FormData();
    formData.append('multipartFile', e.target.files[0])

    dispatch(__postProfileImg(formData));

    console.log(e.target.files);
    console.log(e.target.files[0].name);
  }

  const onClickEditProfileImgHandler = () => {
    uploadProfileRef.current.click();
  }


  const onClickEditTextHandler = () => {

  }

  useEffect(() => {
    dispatch(__getMyInfo())
  }, [dispatch])

  return (
    <StProfileContainer>
      <StImgInfoBox>
        <StImg>
          {!edit
            ?
            <>
              <img src={userInfo && userInfo.profileImage} alt='profile' />
              <div className='rank'>실시간 순위</div>
            </>
            :
            <div onClick={onClickEditProfileImgHandler}>
              <input type='file' accept='image/*' ref={uploadProfileRef} onChange={onChangeUploadProfileImageHandler} />
              <img src={userInfo && userInfo.profileImage} alt='profile' />
              <div className='editBox'>
                <img src={cameraSvg} alt='imgEdit' style={{ width: '100%' }} />
              </div>
            </div>
          }
        </StImg>
        <StInfo>
          <p>평균 투두 달성률</p>
          <p>82.57%</p>
          <ProgressBar now={82.57} style={{ backgroundColor: '#fff', color: '#FF8F27', height: '12px', marginTop: '5px' }} />
        </StInfo>
      </StImgInfoBox>
      <StTextBox>
        <p>닉네임</p>
        {!edit
          ?
          <p className='text'>
            각오 한마디 서울대 가즈아!! 서울대 가즈아!!서울대 가즈아!!서울대 가즈아!!서울대 가즈아!!
          </p>
          :
          <div className='editText' onClick={onClickEditTextHandler}>
            <p className='text'>
              각오 한마디 서울대 가즈아!! 서울대 가즈아!!서울대 가즈아!!서울대 가즈아!!서울대 가즈아!!
            </p>
            <img src={logoPencil} alt='editText' />
          </div>
        }
      </StTextBox>
      {!edit
        ?
        <StBtn onClick={onClickEditHandler}>프로필 편집</StBtn>
        :
        <StBtn onClick={onClickCompleteHandler}>완료</StBtn>
      }
    </StProfileContainer>
  )
}

const StProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  height:300px;
  box-sizing:border-box;
  padding:2rem 1rem 1rem 1rem;
`

const StImgInfoBox = styled.div`
  width:100%;
  height:100px;
  display: flex;
  justify-content:space-between;
`

const StImg = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position:relative;

  & img {
    width:80px;
    height:80px;
    border-radius:50%;
  }

  & div.rank {
    width: 70px;
    height: 20px;
    background-color: #E2EAFF;
    color: #618AF2;
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
    height:30px;
    border-radius: 50%;
    background-color: #FF7B00;
    display: flex;
    align-items:center;
    justify-content:center;
    padding: 5px;
    position:absolute;
    bottom:0;
    left:60px;
  }

  & input {
    display: none;
  }
`

const StInfo = styled.div`
  width: 168px;
  height: 80px;
  background-color: #FFE9D4;
  border-radius: 10px;
  font-size: 0.9rem;
  padding:0.5rem 0.8rem;
  box-sizing:border-box;
  text-align:right;

  & p {
    margin: 0;
    color:#FF8F27;
  }

  .progress-bar {
    background-color: #FF8F27;
  }
`

const StTextBox = styled.div`
  margin-top: 10px;
  height: 90px;

  & p {
    margin: 0;
    color: #111; 
    font-size: 1rem;
  }

  & p.text {
    margin-top:5px;
    font-size: 0.9rem;
  }

  & div.editText {
    margin-top:5px;
    position:relative;
    border-bottom: 1px solid #ececec;

    img {
      width: 20px;
      height:20px;
      position:absolute;
      right:0;
      top: 20px;
    }
  }
`

const StBtn = styled.button`
  width:280px;
  height: 40px;
  background-color:#F8F8F8;
  border-radius: 8px;
  border: none;
  margin:15px auto 0rem auto;
`

export default Profile