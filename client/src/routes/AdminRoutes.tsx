import React from 'react'
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from './ProtectedRoute';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import HomePage from '../pages/HomePage';
import Users from '../pages/Users';
import Permissions from '../pages/Permissions';
import AuthRoute from './AuthRoute';
import { useSelector } from 'react-redux';
import { State } from '../redux/store';
import NotAuthorized from '../pages/NotAuthorized';
import Roles from '../pages/Roles';

const AdminRoutes:React.FC = () => {
  const { userData } = useSelector((state: State) => state.login)

  return (
    <Routes>
      <Route element={<ProtectedRoutes />  }>

      <Route path="/" element={<HomePage />}/>
        <Route path="/role" element={<AuthRoute collectionName='ROLES' element={<Roles />}/>} />
        <Route path="/user" element={<AuthRoute collectionName='UTILISATEURS' element={<Users />}/>} />

        <Route path="/permissions" element={userData.dev ? <Permissions /> : <NotAuthorized />}/>
        
        <Route path="/login" element={<Login />}/>
        <Route path="*" element={<NotFound />}/>
      </Route>
    </Routes>
  )
}

export default AdminRoutes
