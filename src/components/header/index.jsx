import React, { useState, useCallback, useRef } from "react";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);
  const headerRef = useRef(null);

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
    const options = { passive: true };
    // Initial check
    handleScroll();

    // Add scroll listener with passive flag for better performance
    window.addEventListener("scroll", handleScroll, options);

    return () => window.removeEventListener("scroll", handleScroll, options);
  }, [handleScroll]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setMenuOpen(false);
  }, [setMenuOpen]);

  const scrollToSection = useCallback(
    (sectionId) => {
      const section = document.getElementById(sectionId);

      if (!section) {
        // Helpful console warning for debugging
        console.warn(`Header: section with id="${sectionId}" not found.`);
        return;
      }

      const headerHeight = headerRef.current?.offsetHeight ?? 80;
      const targetPosition =
        section.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: "smooth",
      });
      setMenuOpen(false);
    },
    [setMenuOpen]
  );

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleNavKeyDown = (e, sectionId) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      scrollToSection(sectionId);
    }
  };

  return (
    <header ref={headerRef} className={`content ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="header">
          <h1 onClick={scrollToTop} className="title" style={{ cursor: "pointer" }}>
            ALISHER
          </h1>

          <div
            className={`menu-icon ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
            role="button"
            aria-expanded={menuOpen}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleMenu();
              }
            }}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>

          <div className={`info-content ${menuOpen ? "show" : ""}`}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => scrollToSection("about")}
              onKeyDown={(e) => handleNavKeyDown(e, "about")}
            >
              about
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={() => scrollToSection("project")}
              onKeyDown={(e) => handleNavKeyDown(e, "project")}
            >
              projects
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={() => scrollToSection("skills")}
              onKeyDown={(e) => handleNavKeyDown(e, "skills")}
            >
              skills
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={() => scrollToSection("resume")}
              onKeyDown={(e) => handleNavKeyDown(e, "resume")}
            >
              resume
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={() => scrollToSection("contact")}
              onKeyDown={(e) => handleNavKeyDown(e, "contact")}
            >
              contact
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
