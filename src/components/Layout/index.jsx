import React from 'react'
import Header from '../header'
import Footer from '../footer'
import AnimatedBackground from './AnimatedBackground'
import { Outlet } from 'react-router-dom'

function Layout() {

  return (
    <div>
      <AnimatedBackground />
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
