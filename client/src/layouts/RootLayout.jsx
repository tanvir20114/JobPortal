import React from 'react'
import { Outlet } from 'react-router'
import NavBar from '../pages/Shared/NavBar'
import Footer from '../pages/Shared/Footer'

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      <NavBar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}