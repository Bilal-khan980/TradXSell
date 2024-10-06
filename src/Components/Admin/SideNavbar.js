import { faBoxOpen, faShoppingCart, faSignOutAlt, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import logo from '../Assets/logo-without-bg.png'; // Update to your logo path

const SideNavbar = () => {
  const { handleLogout } = useContext(AuthContext);

  return (
    <aside style={styles.sidebar}>
      {/* Logo Section */}
      <div style={styles.logoContainer}>
        <img src={logo} alt="Logo" style={styles.logo} />
      </div>

      {/* Navigation Links */}
      <ul style={styles.navList}>
        {[
          { name: 'Dashboard', icon: faTachometerAlt },
          { name: 'Products', icon: faBoxOpen },
          { name: 'Orders', icon: faShoppingCart }
        ].map((item, index) => {
          const link = item.name === 'Dashboard' ? 'sellerdashboard' : item.name.toLowerCase();

          return (
            <li key={index} style={styles.navItem}>
              <NavLink
                to={`/admin/${link}`}
                style={({ isActive }) => ({
                  ...styles.navLink,
                  backgroundColor: isActive ? '#333' : 'transparent',
                  color: isActive ? '#fff' : '#bbb',
                })}
                activeStyle={styles.activeNavLink}
              >
                <FontAwesomeIcon icon={item.icon} style={styles.navIcon} />
                {item.name}
              </NavLink>
            </li>
          );
        })}
      </ul>

      {/* Logout Button */}
      <div style={styles.logoutContainer}>
        <button onClick={handleLogout} style={styles.logoutButton}>
          <FontAwesomeIcon icon={faSignOutAlt} style={styles.navIcon} />
          LOGOUT
        </button>
      </div>
    </aside>
  );
};

// Styles for the components
const styles = {
  sidebar: {
    width: '250px',
    backgroundColor: '#000', // Black background
    color: 'white', // White text color
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100vh',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  logo: {
    width: '200px',
    height: 'auto',
  },
  navList: {
    listStyleType: 'none',
    padding: 0,
  },
  navItem: {
    margin: '15px 0',
  },
  navLink: {
    textDecoration: 'none',
    color: '#bbb', // Default text color
    transition: '0.3s',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
    borderRadius: '4px',
    gap: '10px',
    fontSize: '16px',
    fontWeight: '500',
  },
  navIcon: {
    fontSize: '18px',
  },
  activeNavLink: {
    backgroundColor: '#333', // Darker background for active state
    color: '#fff',
  },
  logoutContainer: {
    marginTop: 'auto',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#e74c3c', // Red color for logout
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: '0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
};

export default SideNavbar;
