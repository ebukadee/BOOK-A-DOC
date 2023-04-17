import React from 'react'
import { Link } from 'react-router-dom'



const Dashboard = ({ children }) => {
  return (
    <section className="bg-midWhite min-h-[100vh]">
      <nav className="flex justify-between items-center py-4 px-8">
        <div><Link to='/' className="text-xl">BOOK A DOC</Link></div>
        <div>
          <Link to='/profile'>Profile</Link>
          <Link to='/book-appointment' className="ml-5">Book Appointment</Link>
        </div>
      </nav>

      <div className="px-8">
        {children}
      </div>
    </section>
  )
}

export default Dashboard