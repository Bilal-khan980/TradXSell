// RemarksPopup.js
import React, { useState } from 'react';
import axios from 'axios';

const RemarksPopup = ({ product, onClose, onRemarksSubmitted }) => {
  const [remarks, setRemarks] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/products/updateRemarks/${product._id}`, { remarks });
      onRemarksSubmitted(product._id, remarks); // Notify parent component about the updated remarks
      onClose(); // Close the popup
    } catch (error) {
      console.error('Error updating remarks:', error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Input Remarks for {product.name}</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter remarks..."
            rows="4"
            required
          />
          <div>
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RemarksPopup;
