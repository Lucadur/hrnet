import React from "react";
import PropTypes from "prop-types";
import "./Modal.css";

function Modal({ isOpen, onClose, children, style, className }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  style: PropTypes.object, // Custom styles
  className: PropTypes.string, // Custom class name
};

export default Modal;
