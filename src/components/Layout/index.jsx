import React from 'react'
import Header from '../header'
import Footer from '../footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  const [showHeader, setShowHeader] = React.useState(false)
  const [showFooter, setShowFooter] = React.useState(false)

  React.useEffect(() => {
    const onReady = () => {
      setShowHeader(true)
      setShowFooter(true)
    }
    window.addEventListener('intro:ready', onReady)
    return () => window.removeEventListener('intro:ready', onReady)
  }, [])

  return (
    <div>
      {showHeader && <div className="reveal" style={{"--i": 0}}><Header /></div>}
      <Outlet />
      {showFooter && <Footer />}
    </div>
  )
}

export default Layout
