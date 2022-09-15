import React from 'react'
import styled from 'styled-components'

const ProfilePhotos = () => {
  return (
    <StContainer>
      <StImg></StImg>
      <StImg></StImg>
      <StImg></StImg>
      <StImg></StImg>
      <StImg></StImg>
      <StImg></StImg>
      <StImg></StImg>
    </StContainer>
  )
}

const StContainer = styled.div`
  width:100%;
  height:260px;
  background-color:#F8F8F8;
  padding:1rem;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
`

const StImg = styled.div`
  width:110px;
  height:110px;
  border-radius: 16px;
  background-color: #111;
  margin: 0.1rem
`

export default ProfilePhotos;