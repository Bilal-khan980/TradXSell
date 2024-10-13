import { AlertCircle, LogOut, Package, Users, CheckCircle } from 'lucide-react'; // Import CheckCircle for Quality Assurance
import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import logo from '../Assets/logo-without-bg.png'; // Update to your logo path

const SideNavbar = () => {
  const [isCollapsed] = useState(false);
  const location = useLocation();
  const { handleLogout } = useContext(AuthContext);

  const navItems = [
    { name: 'Manage Products', icon: Package, path: '/admin/checkproducts' },
    { name: 'Manage Users', icon: Users, path: '/admin/checksellers' },
    { name: 'Manage Complaints', icon: AlertCircle, path: '/admin/checkcomplaints' },
    { name: 'Quality Assurance', icon: CheckCircle, path: '/admin/qualityassuranceadd' }, // Add Quality Assurance option
  ];

  const styles = {
    nav: {
      backgroundColor: '#1a1a1a', // Blackish shade
      color: '#ffffff',
      height: '100vh',
      width: isCollapsed ? '60px' : '240px',
      transition: 'width 0.3s ease',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottom: '1px solid #333333',
      height: '150px',
    },
    logo: {
      marginBottom: '10px',
      marginTop: '30px',
    },
    logoImg: {
      width: '200px',
      height: 'auto',
    },
    ul: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      flexGrow: 1,
    },
    li: {
      margin: '10px 0',
    },
    link: (isActive) => ({
      display: 'flex',
      alignItems: 'center',
      padding: '10px 20px',
      textDecoration: 'none',
      color: isActive ? '#ef5b2b' : '#ffffff',
      backgroundColor: isActive ? '#333333' : 'transparent',
      transition: 'background-color 0.3s ease',
    }),
    icon: {
      marginRight: isCollapsed ? 0 : '10px',
    },
    footer: {
      padding: '20px',
      borderTop: '1px solid #333333',
    },
    logoutButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: isCollapsed ? 'center' : 'flex-start',
      width: '100%',
      padding: '10px',
      background: 'none',
      border: 'none',
      color: '#ffffff',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      marginLeft: '50px',
    },
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.header}>
        {!isCollapsed && (
          <div style={styles.logo}>
            <img src={logo} alt="Logo" style={styles.logoImg} />
          </div>
        )}
      </div>
      <ul style={styles.ul}>
        {navItems.map((item, index) => (
          <li key={index} style={styles.li}>
            <Link
              to={item.path}
              style={styles.link(location.pathname === item.path)}
            >
              <item.icon size={24} style={styles.icon} />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
      <div style={styles.footer}>
        <button
          onClick={handleLogout}
          style={styles.logoutButton}
        >
          <LogOut size={24} style={styles.icon} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </nav>
  );
};

export default SideNavbar;
