import React from "react";
import "./About.css";

function About() {
  return (
    <section id="about" className="about">
      <h2>About me</h2>
      <div className="info-about container">
        <div className="block1">
          <p className="p">
          Hello Im <b>Talipjanov Alisher Manasovich.</b> I am a front-end web developer. For me, creating websites is the best way to combine creativity with technology. My goal is to showcase myself in this field, create user-friendly and aesthetically pleasing web applications, and expand my experience. In my 6 months of experience, I have worked with technologies such as JavaScript, React, GitHub, and TypeScript. Besides coding, I enjoy participating in creative projects, designing, and learning new technologies. In my personal life, I love playing the guitar.

          </p>
        </div>
        <div className="block2">
          <img src="/photo.png" alt="photo" />
        </div>
      </div>
    </section>
  );
}

export default About;
