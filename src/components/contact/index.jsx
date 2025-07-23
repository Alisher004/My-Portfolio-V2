import React, { useState } from "react";
import { FaLinkedin, FaInstagram, FaGithub, FaYoutube } from "react-icons/fa";
import "./ContactForm.css"

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setStatus("Бардык талааларды толтуруңуз.");
      return;
    }

    setStatus("Билдирүү жөнөтүлдү!");
    setName("");
    setEmail("");
    setMessage("");

  setTimeout(() => {
    setStatus(""); 
  }, 3000); 
};


  return (
    <div id="contact" className="contact-form">
      <div className="box1">
        <h2>Send Message</h2>
        <form
          action="https://formsubmit.co/alisermanasov00@gmail.com"
          method="POST"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <input
            type="text"
            name="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            name="message"
            placeholder="cmc"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit">Send</button>
        </form>
        {status && (
          <p className={`status-message ${status === "Билдирүү жөнөтүлдү!" ? "success" : "error"}`}>
            {status}
          </p>
        )}
      </div>

      <div className="box2">
        <h2>Contacts</h2>
        <div className="infobox2">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/%D0%B0%D0%BB%D0%B8%D1%88%D0%B5%D1%80-%D0%BC%D0%B0%D0%BD%D0%B0%D1%81%D0%BE%D0%B2-79665032a/"
          >
            <div className="item">
              <FaLinkedin size={30} />
              <b>Linkedin</b>
            </div>
          </a>
          <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/_manasovi4/">
            <div className="item">
              <FaInstagram size={30} />
              <b>Instagram</b>
            </div>
          </a>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/Alisher004">
            <div className="item">
              <FaGithub size={30} />
              <b>Github</b>
            </div>
          </a>
          <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/@%D0%90%D0%BB%D0%B8%D1%88%D0%B5%D1%80444">
            <div className="item">
              <FaYoutube size={30} />
              <b>YouTube</b>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
