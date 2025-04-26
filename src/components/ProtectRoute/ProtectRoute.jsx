import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectRoute = ({children}) => {
    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")
  return accessToken && refreshToken ? <Outlet /> : <Navigate to={"/login"} replace />;
}

export default ProtectRoute