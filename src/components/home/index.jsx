import React, { useCallback } from "react";
import "./Home.css";

function Homecom() {
  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = 80; // Account for fixed header
      const targetPosition = section.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  }, []);

  return (
    <div className="home container">
      <div className="left-block">
        <h1 className="reveal" style={{"--i": 0}}>Frontend</h1>
        <strong className="reveal" style={{"--i": 1}}>Developer</strong> <br />
        <span className="reveal" style={{"--i": 2}}>
          Menciptakan Website Yang Inovatif, Fungsional, dan <br />
          User-Friendly untuk Solusi Digital.
        </span>
        <div className="home-buttons1 reveal" style={{"--i": 3}}>
          <div className="home-btn1">
            <button onClick={() => scrollToSection("project")}>Projects</button>
            <button onClick={() => scrollToSection("contact")}>Contact</button>
          </div>
          <div className="home-btn">
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/Alisher004">
              <button>GitHub</button>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/%D0%B0%D0%BB%D0%B8%D1%88%D0%B5%D1%80-%D0%BC%D0%B0%D0%BD%D0%B0%D1%81%D0%BE%D0%B2-79665032a/"
            >
              <button>LinkedIn</button>
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/_manasovi4/">
              <button>Instagram</button>
            </a>
          </div>
        </div>
      </div>
      <div className="right-block">
        <img 
          className="hero-image" 
          src="/Coding.gif" 
          alt="Coding Animation"
          loading="eager"
          style={{
            transform: 'translateZ(0)',
            WebkitTransform: 'translateZ(0)'
          }}
        />
      </div>
    </div>
  );
}

export default Homecom;
