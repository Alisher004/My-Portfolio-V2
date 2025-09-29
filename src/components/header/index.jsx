import React, { useState } from "react";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); // Меню жабылат
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`content ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="header">
          <h1 onClick={scrollToTop} className="title">ALI</h1>

          <div className={`menu-icon ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>

          <div className={`info-content ${menuOpen ? "show" : ""}`}>
            <nav onClick={() => scrollToSection("about")}>about</nav>
            <nav onClick={() => scrollToSection("project")}>projects</nav>
            <nav onClick={() => scrollToSection("resume")}>resume</nav>
            <nav onClick={() => scrollToSection("contact")}>contact</nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;