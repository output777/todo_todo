import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { __getImages } from '../../redux/modules/mySlice'

const ProfilePhotos = () => {
  const dispatch = useDispatch();
  const { images, error } = useSelector((state) => state.my);
  console.log('state', error, images);

  useEffect(() => {
    dispatch(__getImages());
  }, [dispatch])

  return (
    <StContainer>
      {error ? error : null}
      {images.length > 0 && images.map((data) => (
        <StImg>
          <img src={data} alt='boast' />
        </StImg>
      ))}
    </StContainer>
  )
}

const StContainer = styled.div`
  width:100%;
  height:50vh;
  /* box-sizing:border-box; */
  background-color:#F8F8F8;
  padding:1rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 100px;
  grid-gap:10px;
  padding-bottom: 70px;
  overflow-y: scroll;
`

const StImg = styled.div`
  height:100px;
  border-radius: 16px;
  overflow:hidden;


  & img {
    width:100%;
    height:100px;
    border-radius: 16px;
  }
`

export default ProfilePhotos;