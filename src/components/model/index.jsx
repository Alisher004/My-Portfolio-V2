import React, { useState, useEffect } from "react";
import "./Modal.css";
import { FaCode, FaUser, FaCoffee } from "react-icons/fa";

function Modal() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // 3 секундадан кийин жабылат

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`modal ${isVisible ? "" : "hidden"}`}>
      <div className="modal-content">
        <div className="icons">
          <FaCode size={"40"}/>
          <FaUser size={"40"}/>
          <FaCoffee size={"40"}/>
        </div>
        <h1>
          <span className="white-text">Welcome To My</span>
        </h1>
        <h1>
          <span className="purple-text">Portfolio</span>
          <span className="purple-light-text">Website</span>
        </h1>
      </div>
    </div>
  );
}

export default Modal;