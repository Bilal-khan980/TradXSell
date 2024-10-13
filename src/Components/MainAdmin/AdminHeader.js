import { User } from 'lucide-react';
import React from 'react';

const AdminHeader = () => {
  const styles = {
    header: {
      backgroundColor: '#121212',
      color: 'white',
      padding: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
    },
    logo: {
      width: '40px',
      height: '40px',
      backgroundColor: '#ef5b2b',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '16px',
    },
    logoText: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'white',
    },
    title: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginTop:'8px'
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    searchBar: {
      position: 'relative',
    },
    searchInput: {
      backgroundColor: '#333',
      color: 'white',
      paddingLeft: '40px',
      paddingRight: '16px',
      paddingTop: '8px',
      paddingBottom: '8px',
      borderRadius: '9999px',
      border: 'none',
      outline: 'none',
    },
    searchIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#888',
    },
    iconButton: {
      position: 'relative',
      padding: '8px',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '9999px',
      cursor: 'pointer',
      color: 'white',
      transition: 'background-color 0.2s',
    },
    notificationBadge: {
      position: 'absolute',
      top: '0',
      right: '0',
      backgroundColor: '#ef5b2b',
      color: 'white',
      fontSize: '12px',
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    userProfile: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    userName: {
      '@media (max-width: 768px)': {
        display: 'none',
      },
    },
    divider: {
      height: '2px',
      backgroundColor: '#ef5b2b', // You can change this to match your design
      margin: '0', // Optional: Add margin if needed
    },
  };

  return (
    <>
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.logo}>
            <span style={styles.logoText}>A</span>
          </div>
          <h1 style={styles.title}>Admin Dashboard</h1>
        </div>
        <div style={styles.headerRight}>
          
        
          <button style={styles.iconButton}>
            <div style={styles.userProfile}>
              <User size={20} />
              <span style={styles.userName}> Admin</span>
            </div>
          </button>
        </div>
      </header>
      <div style={styles.divider} />
    </>
  );
};

export default AdminHeader;
