import React from 'react'
import Login from '../../components/Auth/Login.jsx'
import { Helmet } from "react-helmet";

function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Đăng nhập</title>
        <meta name="description" content="" />
      </Helmet>
      <Login />
    </>
  )
}

export default LoginPage