import { faEnvelope, faHome, faLock, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function Register({ setIsRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState(""); // State for error messages
    const [successMessage, setSuccessMessage] = useState(""); // State for success message

    const navigate = useNavigate(); // Initialize useNavigate

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

            const data = await response.json(); // Get response data

            if (response.ok) {
                // Successful registration
                setSuccessMessage("You are registered successfully!"); // Set success message
                setError(""); // Clear any previous error
                
                // Remove success message after 3 seconds and redirect
                setTimeout(() => {
                    setSuccessMessage(""); // Clear the success message
                    navigate('/loginpage'); // Redirect to the new page (replace '/new-page' with your desired path)
                }, 1000);
            } else {
                // Handle error if email already exists
                if (data.error) {
                    setError(data.error); // Set error message
                }
            }
        } catch (error) {
            console.error('Error registering:', error);
            setError("An error occurred. Please try again."); // Handle unexpected errors
        }
    };

    const styles = {
        container: {
            display: 'flex',
            minHeight: '100vh',
            backgroundColor: '#f7fafc',
        },
        imageContainer: {
            flex: 1,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '40%',
            display: 'flex',
            justifyContent: 'center',
            animation: 'rotateGlobe 30s infinite linear',
        },
        formContainer: {
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
        },
        formBox: {
            width: '100%',
            maxWidth: '400px',
            padding: '2rem',
            backgroundColor: 'white',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
        },
        header: {
            marginBottom: '2rem',
            textAlign: 'center',
            fontSize: '1.875rem',
            fontWeight: '600',
            color: '#EF5D2E ',
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
        forgotPassword: {
            textAlign: 'right',
            fontSize: '0.875rem',
            color: '#EF5B2B',
            cursor: 'pointer',
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


    const keyframes = `
    @keyframes rotateGlobe {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    `;

    return (
        <div style={styles.container}>
            <style>{keyframes}</style>
            <div style={styles.imageContainer}></div>
            <div style={styles.formContainer}>
                <div style={styles.formBox}>
                    <div style={styles.header}>
                        Register
                    </div>
                    {error && <div style={styles.alert}>{error}</div>} {/* Show error message */}
                    {successMessage && <div style={styles.success}>{successMessage}</div>} {/* Show success message */}
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

                    <div style={styles.registerMessage}>
                        Already have an account?{' '}
                        <span style={styles.registerLink} onClick={() => setIsRegister(false)}>
                            Login
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
