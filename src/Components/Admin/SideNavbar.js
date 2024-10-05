// SideNavbar.js

import { faBoxOpen, faShoppingCart, faSignOutAlt, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../AuthContext';
// Sample logo path
import logo from '../Assets/logo-without-bg.png'; // Update this to your logo's path

const SideNavbar = () => {
  const { handleLogout } = useContext(AuthContext);

  return (
    <aside style={{
      width: '250px', // Adjust width as needed
      backgroundColor: '#1b2b34',
      color: 'white',
      padding: '20px',
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between', // Ensures the logout button stays at the bottom
      height: '100vh', // Full height
    }}>
      {/* Logo Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
      }}>
        <img src={logo} alt="Logo" style={{ width: '200px', height: '100px', marginRight: '10px' }} />
      </div>

      {/* Navigation Links */}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {[
          { name: 'Dashboard', icon: faTachometerAlt },
          { name: 'Products', icon: faBoxOpen },
          { name: 'Orders', icon: faShoppingCart }
        ].map((item, index) => {
          const link = item.name === 'Dashboard' ? 'sellerdashboard' : item.name.toLowerCase();

          return (
            <li key={index} style={{ margin: '15px 0' }}>
              <NavLink
                to={`/admin/${link}`}
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  color: isActive ? '#1abc9c' : '#ecf0f1',
                  transition: '0.3s',
                  display: 'block',
                  padding: '10px 15px',
                  borderRadius: '4px',
                  backgroundColor: isActive ? '#34495e' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px' // Gap between icon and text
                })}
              >
                <FontAwesomeIcon icon={item.icon} />
                {item.name}
              </NavLink>
            </li>
          );
        })}
      </ul>

      {/* Logout Button */}
      <div style={{ marginTop: 'auto', textAlign: 'center' }}>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '10px 20px',
            cursor: 'pointer',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px' // Gap between icon and text
          }}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          LOGOUT
        </button>
      </div>
    </aside>
  );
};

export default SideNavbar;
