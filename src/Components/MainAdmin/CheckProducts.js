import axios from 'axios';
import { RefreshCw, Search, Trash2, Filter } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ProductDetailsPopup from '../ProductDetailspopup';

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [remarksProduct, setRemarksProduct] = useState(null); // State for product requiring remarks
  const [remarks, setRemarks] = useState(''); // State for remarks

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products/all/x');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === 'approved' ? 'not approved' : 'approved';
    try {
      await axios.patch(`/products/updatestatus/${id}`, { status: newStatus });
      if (newStatus === 'not approved') {
        setRemarksProduct(products.find(product => product._id === id)); // Set product for remarks
      } else {
        setProducts(prevProducts =>
          prevProducts.map(product =>
            product._id === id ? { ...product, status: newStatus } : product
          )
        );
      }
    } catch (error) {
      console.error('Error updating product status:', error);
    }
  };

  const handleRemarksSubmitted = (id) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product._id === id ? { ...product, remarks } : product
      )
    );
    setRemarks(''); // Reset remarks after submission
    setRemarksProduct(null); // Close remarks popup
    window.location.reload(); 
  };

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return; // Exit if the user cancels the action

    try {
      await axios.delete(`/products/${productId}`);
      setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('There was an error deleting the product. Please try again.'); // Optional user feedback
      window.location.reload(); 

    }
  };

  const handleDetailsClick = (product) => {
    setSelectedProduct(product);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
    setRemarksProduct(null); // Close remarks popup
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter ? product.status === statusFilter : true)
  );

  return (
    <div className="manage-products" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: '#ef5b2b', marginBottom: '30px', fontSize: '2.5rem', fontWeight: 'bold' }}>Manage Products</h1>
        
        <div className="search-bar" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
          <div style={{ position: 'relative', maxWidth: '400px', flex: '1' }}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 40px 10px 15px',
                borderRadius: '25px',
                border: '1px solid #ced4da',
                fontSize: '1rem'
              }}
            />
            <Search style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
          </div>
          <Filter size={24} style={{ color: '#6c757d', cursor: 'pointer' }} />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="statusFilter" style={{ marginRight: '10px', fontWeight: 'bold' }}>Status:</label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: '10px',
                borderRadius: '25px',
                border: '1px solid #ced4da',
                fontSize: '1rem'
              }}
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="not approved">Not Approved</option>
            </select>
          </div>
        </div>

        <div className="product-list" style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={tableHeaderStyle}>Image</th>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Price</th>
                <th style={tableHeaderStyle}></th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={tableHeaderStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product._id} style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={tableCellStyle}>
                    <img src={product.imageUrl} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} />
                  </td>
                  <td style={tableCellStyle}>{product.name}</td>
                  <td style={tableCellStyle}>${product.price.toFixed(2)}</td>
                  <td style={tableCellStyle}></td>
                  <td style={tableCellStyle}>
                    <button
                      style={{
                        backgroundColor: product.status === 'approved' ? '#28a745' : '#ffc107',
                        color: '#fff',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      {product.status}
                    </button>
                  </td>
                  <td style={tableCellStyle}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button 
                        onClick={() => handleStatusChange(product._id, product.status)} 
                        style={actionButtonStyle}
                      >
                        <RefreshCw size={16} />
                        Change Status
                      </button>
                      <button
                        onClick={() => handleDetailsClick(product)}
                        style={{ ...actionButtonStyle, color: '#ef5b2b', backgroundColor: 'white', border: '3px solid #ef5b2b' }}
                      >
                        Details
                      </button>
                      <button onClick={() => handleDeleteProduct(product.id)}  style={{ ...actionButtonStyle, backgroundColor: '#dc3545' }}>
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedProduct && (
        <ProductDetailsPopup product={selectedProduct} onClose={handleClosePopup} />
      )}
      
      {remarksProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            width: '400px',
            animation: 'fadeIn 0.3s'
          }}>
            <h2 style={{ marginBottom: '20px' }}>Input Remarks for {remarksProduct.name}</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleRemarksSubmitted(remarksProduct._id); }}>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter remarks..."
                rows="4"
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ced4da',
                  marginBottom: '20px',
                  resize: 'none',
                }}
              />
              <div>
                <button type="submit" style={{ marginRight: '10px', backgroundColor: '#007bff', color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '5px' }}>
                  Submit Remarks
                </button>
                <button type="button" onClick={() => setRemarksProduct(null)} style={{ backgroundColor: '#dc3545', color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '5px' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
const tableHeaderStyle = {
  padding: '10px',
  textAlign: 'left',
  fontWeight: 'bold',
  backgroundColor: '#e9ecef',
};

const tableCellStyle = {
  padding: '10px',
  textAlign: 'left',
};

const actionButtonStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default ManageProducts;
