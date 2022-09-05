import React from 'react'
import styled from 'styled-components';
import ProgressBar from 'react-bootstrap/ProgressBar';

const Profile = () => {
  return (
    <StProfileContainer>
      <StImgInfoBox>
        <StImg>
          <div style={{
            width: '70px',
            hight: '40px',
            backgroundColor: '#E2EAFF',
            color: '#618AF2',
            fontSize: '0.7rem',
            borderRadius: '10px',
            boxSizing: 'border-box',
            padding: '0.1rem',
            textAlign: 'center',
            position: 'absolute',
            bottom: '-5px',
            left: '5px',
          }}>실시간 순위</div>
        </StImg>
        <StInfo>
          <p style={{ margin: 0, color: '#FF8F27' }}>평균 투두 달성률</p>
          <p style={{ margin: 0, color: '#FF8F27' }}>82.57%</p>
          <ProgressBar now={82.57} style={{ backgroundColor: '#fff', color: '#FF8F27', height: '12px', marginTop: '5px' }} />
        </StInfo>
      </StImgInfoBox>
      <StTextBox>
        <p style={{ margin: 0, color: '#111', fontSize: '1.1rem' }}>닉네임</p>
        <p style={{ margin: 0, color: '#111', fontSize: '0.9rem' }}>
          각오 한마디 서울대 가즈아!! 서울대 가즈아!!서울대 가즈아!!서울대 가즈아!!서울대 가즈아!!서울대 가즈아!!
        </p>
      </StTextBox>
      <StBtn>프로필 편집</StBtn>
    </StProfileContainer>
  )
}

const StProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding:2rem 1rem 1rem 1rem;
`

const StImgInfoBox = styled.div`
  width:100%;
  display: flex;
  justify-content:space-between;
`

const StImg = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #FF8F27;
  position:relative;
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

  .progress-bar {
    background-color: #FF8F27;
  }
`

const StTextBox = styled.div`
  margin-top: 1rem;
`

const StBtn = styled.button`
  width:280px;
  height: 35px;
  background-color:#F8F8F8;
  border-radius: 8px;
  border: none;
  margin:1rem auto 0.5rem auto;

`

export default Profile