import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div style={modalStyle}>
        <div style={headerStyle}>
          <h2>{title}</h2>
          <button onClick={onClose} style={closeButtonStyle}>×</button>
        </div>
        <div>{children}</div>
      </div>
    </>
  );
};

const overlayStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  zIndex: 1000,
};

const modalStyle = {
  position: 'fixed',
  top: '50%', left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  padding: '1.5rem',
  borderRadius: '8px',
  width: '400px',
  maxHeight: '80vh',
  overflowY: 'auto',
  zIndex: 1001,
  boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
};

const closeButtonStyle = {
  fontSize: '1.5rem',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
};

export default Modal;
