import React, { useState, useCallback, useRef, useEffect } from "react";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);
  const headerRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, []);

  useEffect(() => {
    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  const scrollToSection = useCallback((id) => {
    const section = document.getElementById(id);
    if (!section) return;
    const headerHeight = headerRef.current?.offsetHeight || 80;
    const top = section.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({ top, behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  return (
    <header ref={headerRef} className={`content3 ${scrolled ? "scrolled" : ""}`}>
      <div className="container header">
        <h1 className="title" onClick={scrollToTop}>ALISHER</h1>

        <div
          className={`menu-icon ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") toggleMenu(); }}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <div className={`info-content ${menuOpen ? "show" : ""}`}>
          <a href="#about" onClick={() => scrollToSection("about")}>about</a>
          <a href="#project" onClick={() => scrollToSection("project")}>projects</a>
          <a href="#resume" onClick={() => scrollToSection("resume")}>resume</a>
          <a href="#skills" onClick={() => scrollToSection("skills")}>skills</a>
          <a href="#contact" onClick={() => scrollToSection("contact")}>contact</a>
        </div>
      </div>
    </header>
  );
}

export default Header;