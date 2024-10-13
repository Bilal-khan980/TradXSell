import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader';
import SideNavbar from './SideNavBar';

function Checkcomplaints() {
  const [complaints, setComplaints] = useState([]);
  const [sidebarWidth, setSidebarWidth] = useState(240); // Default width

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('/complaints');
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  const handleSidebarToggle = (isCollapsed) => {
    setSidebarWidth(isCollapsed ? 60 : 240); // Adjust the sidebar width when toggled
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#121212', minHeight: '100vh', color: '#ffffff' }}>
      <SideNavbar onToggle={handleSidebarToggle} />
      <div style={{ 
        flex: 1, 
        marginLeft: `${sidebarWidth}px`, 
        transition: 'margin-left 0.3s ease', // Smooth transition
        display: 'flex', 
        flexDirection: 'column' 
      }}>
        <AdminHeader sidebarWidth={sidebarWidth} />
        <div style={{ padding: '20px', width: '100%' }}>
          <h1 style={{ color: '#EF5B2B', marginBottom: '20px', fontSize: '2rem', fontWeight: 'bold' }}>Complaints</h1>
          <div style={{ overflowX: 'auto', backgroundColor: '#1e1e1e', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
              <thead>
                <tr style={{ backgroundColor: '#2c2c2c' }}>
                  <th style={tableHeaderStyle}>Email</th>
                  <th style={tableHeaderStyle}>Complaint</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #333' }}>
                    <td style={tableCellStyle}>{complaint.email}</td>
                    <td style={tableCellStyle}>{complaint.complaint}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const tableHeaderStyle = {
  padding: '16px',
  textAlign: 'left',
  fontWeight: 'bold',
  color: '#ffffff',
  borderBottom: '2px solid #EF5B2B',
};

const tableCellStyle = {
  padding: '14px',
  color: '#e0e0e0',
};

export default Checkcomplaints;
