import React from 'react'
import Homecom from '../components/home'
import Modal from '../components/model'
import About from '../components/about'
import Projects from '../components/projects'
import Skills from '../components/skills'
import PictureModal from '../components/sertificate'
import ContactForm from '../components/contact'
import Resume from '../components/res'

function Home() {
  const [ready, setReady] = React.useState(false)
  const handleIntroDone = React.useCallback(() => {
    setTimeout(() => {
      setReady(true)
      window.dispatchEvent(new CustomEvent('intro:ready'))
    }, 500)
  }, [])

  return (
    <div>
      <Modal onClose={handleIntroDone} />
      {ready && (
        <>
          <Homecom />
          <About />
          <Projects />
          <Skills />
          <PictureModal />
          <Resume />
          <ContactForm />
        </>
      )}
    </div>
  )
}

export default Home
