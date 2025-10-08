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
      <div id="about">
        <About />
      </div>
      <div id="project">
        <Projects />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="resume">
        <Resume />
      </div>
      <div id="contact">
        <ContactForm />
      </div>
    </div>
  );
}
  );
}

export default Home;
