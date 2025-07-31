// components/BackButton.js
import React from 'react';
import '../styles/BackButton.css';

const BackButton = ({ onClick, children }) => {
  return (
    <button className="back-btn" onClick={onClick}>
      <span className="back-icon">←</span>
      {children}
    </button>
  );
};

export default BackButton;