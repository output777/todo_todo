import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NaverLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/main')
  })

  return (
    <div>로딩중...</div>
  )
}

export default NaverLogin