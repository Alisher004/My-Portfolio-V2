import React from "react";
import "./Header.css";

function Header() {
  // Баракчанын башына жылдыруу функциясы
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Белгилүү бир секцияга жылдыруу функциясы
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="content">
          <h3 onClick={scrollToTop} className="title">
            Алишер
          </h3>
          <div className="info-content">
            <nav onClick={() => scrollToSection("about")}>about</nav>
            <nav onClick={() => scrollToSection("project")}>projects</nav>
            <nav onClick={() => scrollToSection("contact")}>contact</nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
