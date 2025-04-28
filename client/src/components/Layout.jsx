import React from 'react'
import Navbar from './NavBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className='mx-auto w-full mt-16 flex  flex-col grow max-w-3xl'>
        <Outlet />
      </div>
    </>
  )
}

export default Layout