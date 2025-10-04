import React, { useState } from 'react'
import Header from '../header'
import Footer from '../footer'
import AnimatedBackground from './AnimatedBackground'
import Modal from '../model'
import { Outlet } from 'react-router-dom'

function Layout() {
  const [showModal, setShowModal] = useState(true)

  const handleModalClose = () => {
    console.log('Modal closing, showing content...');
    setShowModal(false)
  }

  return (
    <div>
      <AnimatedBackground />
      {showModal && <Modal onClose={handleModalClose} />}
      {!showModal && (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </div>
  )
}

export default Layout