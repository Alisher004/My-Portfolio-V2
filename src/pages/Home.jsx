import React from "react";
import Homecom from "../components/home";
import Modal from "../components/model";
import About from "../components/about";
import Projects from "../components/projects";
import Skills from "../components/skills";
import PictureModal from "../components/sertificate";
import ContactForm from "../components/contact";
import Resume from "../components/res";

function Home() {
  return (
    <div>
      <>
        <Modal />
        <Homecom />
        <About />
        <Projects />
        <Skills />
        <PictureModal />
        <Resume />
        <ContactForm />
      </>
    </div>
  );
}

export default Home;
