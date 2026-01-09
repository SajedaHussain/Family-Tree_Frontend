import React from 'react';
import './PopupCard.css';
import Swal from 'sweetalert2';


const PopupCard = ({ data, onClose, treeCode, onEdit, onDelete }) => {

  if (!data) return null;

  const memberInfo = data;
  const attributes = memberInfo.attributes;
//https://sweetalert2.github.io/ المكتبه اللي استخدمت منها الكود جدا رائعه :
  const handleProtectedAction = async (actionType) => {
    const { value: enteredCode } = await Swal.fire({
      title: 'Security Check',
      text: 'Please enter the Family Code to proceed',
      input: 'text',
      inputPlaceholder: 'Enter code here...',
      showCancelButton: true,
      confirmButtonColor: '#2d5a27',
      confirmButtonText: 'Verify',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to enter the code!';
        }
      }
    });

    if (!enteredCode) return;

    if (enteredCode === treeCode) {
      if (actionType === 'edit') {
        onEdit();
      } else if (actionType === 'delete') {
        onDelete(enteredCode);
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'The code you entered is incorrect.',
        confirmButtonColor: '#ff4d4d'
      });
    }
  };
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
              <p><strong>Relation:</strong> {attributes.Relation}</p>
              <p><strong>Generation:</strong> {attributes.Generation}</p>
              <p><strong>Date Of Birth:</strong> {memberInfo.dateOfBirth?.split('T')[0]}</p>
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
        <div className="action-buttons">
          <button onClick={() => handleProtectedAction('edit')}>✏️ Edit </button>
          <button className="delete-btn" onClick={() => handleProtectedAction('delete')}>🗑️ Delete </button>
        </div>
      </div>
    </div>
  );
};

export default PopupCard;