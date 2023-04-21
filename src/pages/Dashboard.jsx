import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { endpoint } from '../utils/endpoints'
import { useUserContext } from "../context/userContext";
import { toast } from "react-toastify";


const Dashboard = ({ children }) => {
  
  const { setUserHandler } = useUserContext();
  const navigate = useNavigate()

  const logout = async () =>{
    
    const res = await fetch(`${endpoint}/logout`, {credentials: 'include'})
    const result = await res.json()
    if(result.success){
      toast.success("Logout Successful")
      setUserHandler(null)
      return navigate('/')
    }else{
      return toast.error("An error occurred!")
    }
  }

  return (
    <section className="bg-midWhite min-h-[100vh]">
      <nav className="flex justify-between items-center py-4 px-8">
        <div><Link to='/' className="text-xl">BOOK A DOC</Link></div>
        <div>
          <Link to='/profile'>Profile</Link>
          <Link to='/book-appointment' className="ml-5">Book Appointment</Link>
          <span className="ml-5 cursor-pointer hover:text-hint" onClick={logout}>Logout</span>
        </div>
      </nav>

      <div className="px-8">
        {children}
      </div>
    </section>
  )
}

export default Dashboard