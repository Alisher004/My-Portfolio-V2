import React, { useState } from "react";
import "./PictureModal.css";

const PictureModal = ({ imgSrc }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="picture-container">
      <div className="image-wrapper" onClick={handleOpen}>
        <img
          className={`image ${open ? "large" : ""}`}
          src="/ser.png"
          alt="Example"
        />
        {!open && (
          <div className="overlay">
            <div className="hover-content">
              <i className="fas fa-search-plus"></i>
              <p>View Full Image</p>
            </div>
          </div>
        )}
      </div>

      {open && (
        <div className="modal" onClick={handleClose}>
          <div className="modal-content">
            <img
              className="modal-image"
              src="/ser.png"
              alt="Full size"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PictureModal;
