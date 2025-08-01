import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'


function Layout() {
  return (
    <div className='flex justify-center items-center' >
      <Outlet></Outlet>
      <Navigation></Navigation>
    </div>
  )
}

export default Layout
