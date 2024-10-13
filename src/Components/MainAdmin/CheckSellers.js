import axios from 'axios';
import { Search, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader';
import SideNavbar from './SideNavBar';

function CheckSellers() {
  const [sellers, setSellers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/admins');
        setSellers(response.data);
      } catch (error) {
        console.error('Error fetching sellers:', error);
      }
    };
    fetchSellers();
  }, []);

  const filteredSellers = sellers.filter(seller =>
    seller.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDetailsClick = (seller) => {
    setSelectedSeller(seller);
  };

  const handleClosePopup = () => {
    setSelectedSeller(null);
  };

  const handleDelete = async (email) => {
    try {
      await axios.delete(`http://localhost:5000/users/admins/${email}`);
      setSellers(prevSellers => prevSellers.filter(seller => seller.email !== email));
    } catch (error) {
      console.error('Error deleting seller:', error);
    }
  };

  const roleColors = {
    user: '#28a745', 
    seller: '#007bff', 
    QualityAssurance: '#ffc107', 
  };

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
      overflowX: 'hidden',
       backgroundColor:'#121212'
    },
    title: {
      color: '#ef5b2b',
      marginBottom: '30px',
      fontSize: '2rem',
      fontWeight: 'bold'
    },
    searchBar: {
      marginBottom: '30px',
      position: 'relative',
      maxWidth: '400px'
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
    sellerList: {
      backgroundColor: '#2c2c2c',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      overflowX: 'auto'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      minWidth: '600px'
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
    roleButton: (role) => ({
      backgroundColor: roleColors[role] || '#121212',
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
    },
    detailsButton: {
      backgroundColor: 'transparent',
      color: '#ef5b2b',
      border: '1px solid #ef5b2b'
    },
    deleteButton: {
      backgroundColor: '#dc3545'
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
      width: '90%',
      maxWidth: '400px'
    },
    closeButton: {
      backgroundColor: '#ef5b2b',
      color: '#fff',
      padding: '10px 15px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '20px'
    }
  };

  return (
    <div style={styles.container}>
      <SideNavbar isCollapsed={isNavCollapsed} setIsCollapsed={setIsNavCollapsed} />
      <div style={styles.mainContent}>
        <AdminHeader />
        
        <div style={{ padding: '20px', width: '100%' }}>
        <h1 style={styles.title}>Manage Users</h1>
        
        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Search sellers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <Search style={styles.searchIcon} />
        </div>

        <div style={styles.sellerList}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Username</th>
                <th style={styles.tableHeader}>Email</th>
                <th style={styles.tableHeader}>Role</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSellers.map(seller => (
                <tr key={seller._id}>
                  <td style={styles.tableCell}>{seller.username}</td>
                  <td style={styles.tableCell}>{seller.email}</td>
                  <td style={styles.tableCell}>
                    <button style={styles.roleButton(seller.role)}>
                      {seller.role}
                    </button>
                  </td>
                  <td style={styles.tableCell}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => handleDetailsClick(seller)}
                        style={{...styles.actionButton, ...styles.detailsButton}}
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleDelete(seller.email)}
                        style={{...styles.actionButton, ...styles.deleteButton}}
                      >
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

        {selectedSeller && (
          <div style={styles.popup}>
            <div style={styles.popupContent}>
              <h2 style={{marginBottom: '20px'}}>{selectedSeller.username}'s Details</h2>
              <p>Email: {selectedSeller.email}</p>
              <p>Address: {selectedSeller.address}</p>
              <p>Phone Number: {selectedSeller.phoneNumber}</p>
              <button onClick={handleClosePopup} style={styles.closeButton}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default CheckSellers;