import React from 'react'
import Sidebar from '../../components/Sidebar'
import HeaderRectangle from '../../components/HeaderRectangle'
import './style.css'

const SignUpPage: React.FC = () => {
  return (
    <div className="signUpPage">
      <HeaderRectangle></HeaderRectangle>
      <Sidebar></Sidebar>
    </div>
  )
}

export default SignUpPage