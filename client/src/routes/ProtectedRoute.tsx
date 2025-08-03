import React from 'react'
import { useSelector } from 'react-redux'
import {  Navigate, Outlet } from 'react-router'
import { State } from '../redux/store'

const ProtectedRoutes:React.FC = () => {
  const { userData } = useSelector((state: State) => state.login)
  
  return (
    userData ? <Outlet /> : <Navigate to="/login"/>
  )
}

export default ProtectedRoutes
