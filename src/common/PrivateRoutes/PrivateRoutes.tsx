import { Navigate, Outlet } from 'react-router-dom'
import React from 'react';
import {useAppSelector} from "../hooks/useAppSelector";
import {selectAuth} from "../selectors/selectors";


export const PrivateRoutes = () => {
  const isAuth = useAppSelector(selectAuth.AuthIsAuth)

  return isAuth ? <Outlet /> : <Navigate to={'/login'} />
}
