import React, { useState, useCallback, useRef } from "react";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const shouldBeScrolled = window.scrollY > 8;
        if (shouldBeScrolled !== scrolled) {
          setScrolled(shouldBeScrolled);
        }
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [scrolled]);

  React.useEffect(() => {
    // Initial check
    handleScroll();
    
    // Add scroll listener with passive flag for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ 
      top: 0, 
      behavior: "smooth" 
    });
    setMenuOpen(false);
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = 80; // Account for fixed header
      const targetPosition = section.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
      setMenuOpen(false);
    }
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
  }, []);

  return (
    <header className={`content ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="header">
          <h1 onClick={scrollToTop} className="title">ALISHER</h1>

          <div className={`menu-icon ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <div className={`info-content ${menuOpen ? "show" : ""}`}>
            <nav onClick={() => scrollToSection("about")}>about</nav>
            <nav onClick={() => scrollToSection("project")}>projects</nav>
            <nav onClick={() => scrollToSection("skills")}>skills</nav>
            <nav onClick={() => scrollToSection("resume")}>resume</nav>
            <nav onClick={() => scrollToSection("contact")}>contact</nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;