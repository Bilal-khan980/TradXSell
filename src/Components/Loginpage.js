import { faEnvelope, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext';

import loginBg from '../Components/Assets/login-bg.png';

function Login({ setIsRegister, setIsForgotPassword }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const { handleLogin } = useContext(AuthContext);

    const handleLoginValidation = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });
            const data = await response.json();

            if (data.success) {
                handleLogin(data.user.email, data.user.username, data.user.role, data.user.id);
                window.location.href = '/';
            } else {
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 5000);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 5000);
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
            backgroundImage: `url(${loginBg})`,
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
                    <div style={styles.header}>Login</div>
                    <form onSubmit={handleLoginValidation} style={styles.form}>
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
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={styles.input}
                            />
                            <span style={styles.icon}>
                                <FontAwesomeIcon icon={faLock} />
                            </span>
                            <span
                                style={{ ...styles.icon, left: 'auto', right: '0.75rem', cursor: 'pointer' }}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                            </span>
                        </div>

                        {/* <div style={styles.forgotPassword} onClick={() => setIsForgotPassword(true)}>
                            Forgot Password?
                        </div> */}
                        <button type="submit" style={styles.button}>
                            Login
                        </button>
                    </form>
                    {showAlert && (
                        <div style={styles.alert}>
                            Invalid email or password. Please try again.
                        </div>
                    )}
                    <div style={styles.registerMessage}>
                        Don't have an account?{' '}
                        <span style={styles.registerLink} onClick={() => setIsRegister(true)}>
                            Register
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
