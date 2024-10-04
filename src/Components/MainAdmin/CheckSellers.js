import axios from 'axios';
import { Search, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

function CheckSellers() {
  const [sellers, setSellers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeller, setSelectedSeller] = useState(null); 

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
      // Update the sellers list by removing the deleted seller
      setSellers(prevSellers => prevSellers.filter(seller => seller.email !== email));
    } catch (error) {
      console.error('Error deleting seller:', error);
    }
  };

  return (
    <div className="check-sellers" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: '#ef5b2b', marginBottom: '30px', fontSize: '2.5rem', fontWeight: 'bold' }}>Manage Sellers</h1>
        
        <div className="search-bar" style={{ marginBottom: '30px' }}>
          <div style={{ position: 'relative', maxWidth: '400px' }}>
            <input
              type="text"
              placeholder="Search sellers..."
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

        <div className="seller-list" style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={tableHeaderStyle}>Username</th>
                <th style={tableHeaderStyle}>Email</th>
                <th style={tableHeaderStyle}>Role</th>
                <th style={tableHeaderStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSellers.map(seller => (
                <tr key={seller._id} style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={tableCellStyle}>{seller.username}</td>
                  <td style={tableCellStyle}>{seller.email}</td>
                  <td style={tableCellStyle}>
                    <button
                      style={{
                        backgroundColor: seller.role === 'Admin' ? '#28a745' : '#ffc107',
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
                      {seller.role}
                    </button>
                  </td>
                  <td style={tableCellStyle}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => handleDetailsClick(seller)}
                        style={{...actionButtonStyle ,color :'#ef5b2b' , backgroundColor : 'white' , border : '3px solid #ef5b2b'}}
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleDelete(seller.email)}  // Call delete function
                        style={{ ...actionButtonStyle, backgroundColor: '#dc3545' }}
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
          <div className="seller-details-popup">
            <div style={{padding: '20px', backgroundColor: 'white', border: '1px solid #ccc'}}>
              <h2>{selectedSeller.username}'s Details</h2>
              <p>Email: {selectedSeller.email}</p>
              <p>Address: {selectedSeller.address}</p>
              <p>Phone Number: {selectedSeller.phoneNumber}</p>
              <button onClick={handleClosePopup} style={{padding: '10px', backgroundColor: '#ef5b2b', color: 'white', border: 'none', borderRadius: '5px'}}>Close</button>
            </div>
          </div>
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

export default CheckSellers;
