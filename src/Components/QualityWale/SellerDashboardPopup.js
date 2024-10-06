import React from 'react';

function SellerDetailsPopup({ seller, onClose }) {
  return (
    <div className="seller-details-popup" style={popupStyle}>
        {console.log(seller)}
      <div style={popupContentStyle}>
        <h2>Seller Details</h2>
        <p><strong>Email:</strong> {seller.email}</p>
        <p><strong>Name:</strong> {seller.username}</p>
        <p><strong>Phone:</strong> {seller.phone}</p>
        {/* Add more seller details as needed */}
        <button onClick={onClose} style={closeButtonStyle}>Close</button>
      </div>
    </div>
  );
}

const popupStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const popupContentStyle = {
  backgroundColor: '#fff',
  borderRadius: '10px',
  padding: '20px',
  width: '400px',
  boxShadow: '0 0 10px rgba(0,0,0,0.2)',
};

const closeButtonStyle = {
  marginTop: '20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default SellerDetailsPopup;
