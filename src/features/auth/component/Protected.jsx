import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate, useNavigate } from 'react-router-dom'


export default function Protected({children}) {
    const {user, loading} = useAuth()

    const navigate = useNavigate();

    if (loading) return null;
    if(!user){
        return <Navigate to={"/login"}/>
    }
  return children
}
