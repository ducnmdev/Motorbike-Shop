import React from 'react'
import Register from '../../components/Auth/Register.jsx'
import { Helmet } from "react-helmet";

function RegisterPage() {
  return (
    <>
      <Helmet>
        <title>Đăng ký</title>
        <meta name="description" content="" />
      </Helmet>
      <Register />
    </>
  )
}

export default RegisterPage