import React, { useState, useEffect } from 'react'
import { endpoint } from '../utils/endpoints'
import { useNavigate } from 'react-router-dom'
import CircularProgress from "@mui/material/CircularProgress";
import { useUserContext } from '../context/userContext'

const Auth = ({ children }) =>{

    const [auth, setAuth] = useState(null)
    const navigate = useNavigate()
    const { setUserHandler } = useUserContext()

    const settings = {
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        }
    };

    useEffect(()=>{
        (async ()=>{
            try{
                const res = await fetch(`${endpoint}/verify-user`, settings)
                const data = await res.json()
                if(data.success){
                    setUserHandler(data.data)
                    setAuth(true)
                }else{
                    navigate('/login')
                }
            }
            catch(err){
                navigate('/login')
            }
        })()
    }, [])

    return <>{ auth ? children : <section className="flex items-center justify-center h-[100vh]"><CircularProgress size={35} /></section> }</>;
}

export default Auth