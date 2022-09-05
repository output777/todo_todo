import React from 'react'
import styled from 'styled-components'
import Profile from '../components/myPage/Profile'
import ProfileTabs from '../components/myPage/ProfileTabs'
import Navbar from '../components/utils/Navbar'

const MyPage = () => {
  return (
    <StContainer>
      <Profile />
      <ProfileTabs />
      <Navbar />
    </StContainer>
  )
}

const StContainer = styled.div`
  /* padding: 1rem; */
`

export default MyPage