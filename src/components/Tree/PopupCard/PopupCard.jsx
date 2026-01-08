import React from 'react';
import './PopupCard.css';

const PopupCard = ({ data, onClose }) => {

  if (!data) return null;

  const memberInfo = data; 
  const attributes = memberInfo.attributes;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-card" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
      
          <h6>{memberInfo.name} {memberInfo.lastName} </h6>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="popup-content">
          {attributes ? (
            <>
              <p><strong>Relation:</strong> {attributes.Relation }</p>
              <p><strong>Generation:</strong> {attributes.Generation}</p>
              <p><strong>Date Of Birth:</strong> {memberInfo.dateOfBirth.split('T')[0] }</p>
              {attributes.RecordCount && (
                <p><strong>Record Count:</strong> {attributes.RecordCount}</p>
              )}
            <div className="member-image-container">
            {memberInfo.image ? (
              <img 
                src={memberInfo.image} 
                alt={memberInfo.name} 
                style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '15px', border: '2px solid #ddd' }}
              />
            ) : (
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#eee', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' }}>
                👤
              </div>
            )}
          </div>
            </>
          ) : (
            <h1>👪</h1>
          )}
        </div>
      
      </div>
    </div>
  );
};

export default PopupCard;