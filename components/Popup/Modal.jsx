// components/Modal.js
import React from 'react';
//import './Modal.css'; // Ensure you create a CSS file for basic styles

const Modal = ({ show, handleClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          
          <button className="close-button" onClick={handleClose}>
            &times;
          </button>
          
        </div>
        <div className="modal-body">
        
          {children}
          
        </div>
      </div>
    </div>
  );
};

export default Modal;
