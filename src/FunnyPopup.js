import React from "react";
import "./FunnyPopup.css";

const FunnyPopup = ({ message, onClose }) => {
  return (
    <div className="funny-popup">
      <div className="funny-popup-content">
        <p>{message || "Bruh moment 🤣💀"}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default FunnyPopup;
