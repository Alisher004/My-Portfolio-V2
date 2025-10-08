import React from "react";
import Homecom from "../components/home";
import About from "../components/about";
import Projects from "../components/projects";
import Skills from "../components/skills";
import PictureModal from "../components/sertificate";
import ContactForm from "../components/contact";
import Resume from "../components/res";

function Home() {
  return (
function Home() {
  return (
    <div>
      <Homecom />
        <About id="about"/>
        <Projects id="project"/>
        <Skills id="skills"/>
        <Resume id="resume"/>
        <ContactForm id="contact"/>
    </div>
  );
}
  );
}

export default Home;
