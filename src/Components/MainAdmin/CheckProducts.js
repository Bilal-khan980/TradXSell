import axios from 'axios';
import { Filter, RefreshCw, Search, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ProductDetailsPopup from '../ProductDetailspopup';
import AdminHeader from './AdminHeader';
import SideNavbar from './SideNavBar';

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [remarksProduct, setRemarksProduct] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

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
        setRemarksProduct(products.find(product => product._id === id));
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

  const handleRemarksSubmitted = async (id) => {
    try {
      // Make an API request to update the remarks in the backend
      await axios.patch(`/products/remarks/${id}`, { remarks });
  
      // Update the local state to reflect the updated remarks
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product._id === id ? { ...product, remarks } : product
        )
      );
  
      // Clear the remarks and close the popup
      setRemarks('');
      setRemarksProduct(null);
  
      // Optionally reload the page to reflect the updated data
      window.location.reload();
    } catch (error) {
      console.error('Error submitting remarks:', error);
    }
  };
  

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`/products/${productId}`);
      setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('There was an error deleting the product. Please try again.');
      window.location.reload();
    }
  };

  const handleDetailsClick = (product) => {
    setSelectedProduct(product);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
    setRemarksProduct(null);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter ? product.status === statusFilter : true)
  );

  const styles = {
    container: {
      display: 'flex',
      backgroundColor: '#1a1a1a',
      minHeight: '100vh',
      color: '#ffffff'
    },
    mainContent: {
      flex: 1,
      marginLeft: isNavCollapsed ? '60px' : '240px',
      transition: 'margin-left 0.3s ease',
      backgroundColor:'#121212'
    },
    title: {
      color: '#ef5b2b',
      marginBottom: '30px',
      fontSize: '2.5rem',
      fontWeight: 'bold'
    },
    searchBar: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      marginBottom: '30px'
    },
    searchInput: {
      width: '100%',
      padding: '10px 40px 10px 15px',
      borderRadius: '25px',
      border: '1px solid #333333',
      fontSize: '1rem',
      backgroundColor: '#2c2c2c',
      color: '#ffffff'
    },
    searchIcon: {
      position: 'absolute',
      right: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#6c757d'
    },
    filterIcon: {
      color: '#6c757d',
      cursor: 'pointer'
    },
    statusFilter: {
      padding: '10px',
      borderRadius: '25px',
      border: '1px solid #333333',
      fontSize: '1rem',
      backgroundColor: '#2c2c2c',
      color: '#ffffff'
    },
    productList: {
      backgroundColor: '#2c2c2c',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    tableHeader: {
      padding: '15px',
      textAlign: 'left',
      fontWeight: 'bold',
      backgroundColor: '#1a1a1a',
      color: '#ffffff'
    },
    tableCell: {
      padding: '15px',
      textAlign: 'left',
      borderBottom: '1px solid #333333'
    },
    statusButton: (status) => ({
      backgroundColor: status === 'approved' ? '#28a745' : '#ffc107',
      color: '#fff',
      border: 'none',
      padding: '5px 10px',
      borderRadius: '5px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    }),
    actionButton: {
      backgroundColor: '#ef5b2b',
      color: '#fff',
      border: 'none',
      padding: '5px 10px',
      borderRadius: '5px',
      cursor: 'pointer',
      marginRight: '5px'
    },
    detailsButton: {
      backgroundColor: 'transparent',
      color: '#ef5b2b',
      border: '1px solid #ef5b2b',
      padding: '5px 10px',
      borderRadius: '5px',
      cursor: 'pointer'
    },
    deleteButton: {
      backgroundColor: '#dc3545',
      color: '#fff',
      border: 'none',
      padding: '5px 10px',
      borderRadius: '5px',
      cursor: 'pointer'
    },
    popup: {
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
    },
    popupContent: {
      backgroundColor: '#2c2c2c',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      width: '400px',
      animation: 'fadeIn 0.3s'
    },
    textarea: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #333333',
      marginBottom: '20px',
      resize: 'none',
      backgroundColor: '#1a1a1a',
      color: '#ffffff'
    },
    submitButton: {
      backgroundColor: '#ef5b2b',
      color: '#fff',
      padding: '10px 15px',
      border: 'none',
      borderRadius: '5px',
      marginRight: '10px',
      cursor: 'pointer'
    },
    cancelButton: {
      backgroundColor: '#dc3545',
      color: '#fff',
      padding: '10px 15px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    },
    // title: {
    //   color: '#ef5b2b',
    //   marginBottom: '30px',
    //   fontSize: '2rem',
    //   fontWeight: 'bold'
    // },

  };

  return (
    <div style={styles.container}>
      <SideNavbar isCollapsed={isNavCollapsed} setIsCollapsed={setIsNavCollapsed} />
      <div style={styles.mainContent} >
        <AdminHeader />
        <div style={{ padding: '20px', width: '100%' }}>
        <h1 style={styles.title}>Manage Products</h1>
        <div style={styles.searchBar}>
          <div style={{ position: 'relative', maxWidth: '400px', flex: '1' }}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
            <Search style={styles.searchIcon} />
          </div>
          <Filter size={24} style={styles.filterIcon} />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="statusFilter" style={{ marginRight: '10px', fontWeight: 'bold' }}>Status:</label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={styles.statusFilter}
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="not approved">Not Approved</option>
            </select>
          </div>
        </div>

        <div style={styles.productList}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Image</th>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Price</th>
                <th style={styles.tableHeader}></th>
                <th style={styles.tableHeader}>Status</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product._id}>
                  <td style={styles.tableCell}>
                    <img src={product.imageUrl} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} />
                  </td>
                  <td style={styles.tableCell}>{product.name}</td>
                  <td style={styles.tableCell}>${product.price.toFixed(2)}</td>
                  <td style={styles.tableCell}></td>
                  <td style={styles.tableCell}>
                    <button style={styles.statusButton(product.status)}>
                      {product.status}
                    </button>
                  </td>
                  <td style={styles.tableCell}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button 
                        onClick={() => handleStatusChange(product._id, product.status)} 
                        style={styles.actionButton}
                      >
                        <RefreshCw size={16} />
                        Change Status
                      </button>
                      <button
                        onClick={() => handleDetailsClick(product)}
                        style={styles.detailsButton}
                      >
                        Details
                      </button>
                      <button onClick={() => handleDeleteProduct(product.id)} style={styles.deleteButton}>
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
      </div>

      {selectedProduct && (
        <ProductDetailsPopup product={selectedProduct} onClose={handleClosePopup} />
      )}
      
      {remarksProduct && (
        <div style={styles.popup}>
          <div style={styles.popupContent}>
            <h2 style={{ marginBottom: '20px' }}>Input Remarks for {remarksProduct.name}</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleRemarksSubmitted(remarksProduct._id); }}>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter remarks..."
                rows="4"
                required
                style={styles.textarea}
              />
              <div>
                <button type="submit" style={styles.submitButton}>
                  Submit Remarks
                </button>
                <button type="button" onClick={() => setRemarksProduct(null)} style={styles.cancelButton}>
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

export default ManageProducts;