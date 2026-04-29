import React from 'react'
import Navbar from '../navbar/Navbar'
import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <div className='overflow-x-hidden '>
      <Navbar />
      <main className="pt-[78px]">
        <Outlet />
      </main>
    </div>
  )
}

export default Root
