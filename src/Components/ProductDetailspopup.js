// ProductDetailsPopup.js
import React from 'react';

const ProductDetailsPopup = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div style={popupOverlayStyle}>
      <div style={popupStyle}>
        <h2>{product.name}</h2>
        <img src={product.imageUrl} alt={product.name} style={{ width: '100%', borderRadius: '10px' }} />
        <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Sizes:</strong> {product.sizes.join(', ')}</p>
        <p><strong>Colors:</strong> {product.colors.join(', ')}</p>
        <p><strong>Quantity:</strong> {product.quantity}</p>
        <button onClick={onClose} style={closeButtonStyle}>Close</button>
      </div>
    </div>
  );
};

const popupOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const popupStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0,0,0,0.3)',
  width: '400px',
};

const closeButtonStyle = {
  marginTop: '20px',
  padding: '10px 15px',
  backgroundColor: '#ef5b2b',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default ProductDetailsPopup;
