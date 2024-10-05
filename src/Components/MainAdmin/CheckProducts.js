import axios from 'axios';
import { RefreshCw, Search, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ProductDetailsPopup from '../ProductDetailspopup';

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null); 

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
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product._id === id ? { ...product, status: newStatus } : product
        )
      );
    } catch (error) {
      console.error('Error updating product status:', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDetailsClick = (product) => {
    setSelectedProduct(product);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="manage-products" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: '#ef5b2b', marginBottom: '30px', fontSize: '2.5rem', fontWeight: 'bold' }}>Manage Products</h1>
        
        <div className="search-bar" style={{ marginBottom: '30px' }}>
          <div style={{ position: 'relative', maxWidth: '400px' }}>
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
        </div>

        <div className="product-list" style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={tableHeaderStyle}>Image</th>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Price</th>
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
                      {/* {product.status === 'approved' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                      {product.status === 'approved' ? 'Approved' : 'Not Approved'} */}
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
                       
                        onClick={() => handleDetailsClick(product)} // Add details button
                        style={ {...actionButtonStyle ,color :'#ef5b2b' , backgroundColor : 'white' , border : '3px solid #ef5b2b'}}
                        
                      >
                        Details
                      </button>
                      <button style={{ ...actionButtonStyle, backgroundColor: '#dc3545' }}>
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

        {selectedProduct && ( // Render the popup if a product is selected
          <ProductDetailsPopup product={selectedProduct} onClose={handleClosePopup} />
        )}
      </div>
    </div>
  );
}

const tableHeaderStyle = {
  padding: '15px',
  textAlign: 'left',
  fontWeight: 'bold',
  color: '#495057'
};

const tableCellStyle = {
  padding: '15px',
  verticalAlign: 'middle'
};

const actionButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  padding: '5px 10px',
  backgroundColor: '#ef5b2b',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  textDecoration: 'none',
  fontSize: '0.875rem'
};

export default ManageProducts;
