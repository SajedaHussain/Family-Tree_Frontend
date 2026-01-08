import React from 'react';
import './PopupCard.css'; // Add your CSS here

const PopupCard = ({ data, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <div className="popup-header">
          <h6>{data.name} Details</h6>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="popup-content">
          {/* Display node attributes or other info */}
          <p>Record Count: {data.attributes?.RecordCount}</p>
          <p>Prediction: {data.attributes?.prediction}</p>
          {/* Add more details as needed */}
        </div>
      </div>
    </div>
  );
};

export default PopupCard;
