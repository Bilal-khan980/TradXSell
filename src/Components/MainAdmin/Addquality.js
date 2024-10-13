import { faEnvelope, faHome, faLock, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader'; // Import your AdminHeader component
import SideNav from './SideNavBar'; // Import your SideNav component

function Register({ setIsRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();

    const handleRegisterValidation = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/users/addnew', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, username, address, phoneNumber, role: 'QualityAssurance' }),
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage("You are registered successfully!");
                setError("");

                setTimeout(() => {
                    setSuccessMessage("");
                    navigate('/admin/checksellers');
                }, 1000);
            } else {
                if (data.error) {
                    setError(data.error);
                }
            }
        } catch (error) {
            console.error('Error registering:', error);
            setError("An error occurred. Please try again.");
        }
    };

    const styles = {
        container: {
            display: 'flex',
            minHeight: '100vh',
            backgroundColor: '#f7fafc',

        },
        sideNav: {
            width: '240px',
        },
        content: {
            flex: 1,
            transition: 'margin-left 0.3s ease',
            backgroundColor:'#121212'
          
        },
        formBox: {
            paddingTop:'50px',
            width: '100%',
            maxWidth: '400px',
            padding: '2rem',
            backgroundColor: 'black',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            margin: '0 auto',
        },
        header: {
            marginBottom: '2rem',
            textAlign: 'center',
            fontSize: '1.875rem',
            fontWeight: '600',
            color: '#EF5D2E',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
        },
        inputContainer: {
            position: 'relative',
        },
        input: {
            width: '100%',
            padding: '0.5rem 0.75rem',
            paddingLeft: '2.5rem',
            border: '1px solid #e2e8f0',
            borderRadius: '0.375rem',
            fontSize: '1rem',
        },
        icon: {
            position: 'absolute',
            left: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#a0aec0',
        },
        button: {
            width: '100%',
            padding: '0.5rem',
            backgroundColor: '#EF5B2B',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '1rem',
            cursor: 'pointer',
        },
        alert: {
            marginTop: '1rem',
            padding: '0.5rem',
            backgroundColor: '#fed7d7',
            color: '#9b2c2c',
            borderRadius: '0.375rem',
        },
        success: {
            marginTop: '1rem',
            padding: '0.5rem',
            backgroundColor: '#c6f6d5',
            color: '#2f855a',
            borderRadius: '0.375rem',
        },
        registerMessage: {
            marginTop: '1rem',
            textAlign: 'center',
            fontSize: '0.875rem',
            color: '#4a5568',
        },
        registerLink: {
            color: '#EF5B2B',
            cursor: 'pointer',
        },
    };

    return (
        <>
        <div style={styles.container}>
            <div style={styles.sideNav}>
                <SideNav /> {/* Include SideNav */}
            </div>

            <div style={{...styles.content}}>
                <AdminHeader /> {/* Include AdminHeader */}
                <div style={{ padding: '2rem' }}>
                <div style={{...styles.formBox }}>
                    <div style={styles.header}>
                        Add Q/A
                    </div>
                    {error && <div style={styles.alert}>{error}</div>}
                    {successMessage && <div style={styles.success}>{successMessage}</div>}
                    
                    <form onSubmit={handleRegisterValidation} style={styles.form}>
                        <div style={styles.inputContainer}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                style={styles.input}
                            />
                            <span style={styles.icon}>
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                        </div>
                        <div style={styles.inputContainer}>
                            <input
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={styles.input}
                            />
                            <span style={styles.icon}>
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                        </div>
                        <div style={styles.inputContainer}>
                            <input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={styles.input}
                            />
                            <span style={styles.icon}>
                                <FontAwesomeIcon icon={faLock} />
                            </span>
                        </div>
                        <div style={styles.inputContainer}>
                            <input
                                type="text"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                style={styles.input}
                            />
                            <span style={styles.icon}>
                                <FontAwesomeIcon icon={faHome} />
                            </span>
                        </div>
                        <div style={styles.inputContainer}>
                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                                style={styles.input}
                            />
                            <span style={styles.icon}>
                                <FontAwesomeIcon icon={faPhone} />
                            </span>
                        </div>
                        <button type="submit" style={styles.button}>
                            Register
                        </button>
                    </form>
                    
                </div>
                </div>
            </div>
        </div>
        </>
    );
}
export default Register;
