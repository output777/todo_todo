import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NaverLogin = () => {
  const navigate = useNavigate();


  // 네이버는 여기서 서버로 token을 dispatch해서 보내준 뒤 nickname 등 state로 저장하기
  useEffect(() => {
    navigate('/main')
  })

  return (
    <div>로딩중...</div>
  )
}

export default NaverLogin