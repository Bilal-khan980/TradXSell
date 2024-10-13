import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../AuthContext.js';


function Complains() {
    const [complaint, setComplaint] = useState('');
    const { email } = useContext(AuthContext);
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        if (!email) {
            navigate('/loginpage'); // Redirect to the desired page
            return; // Exit the effect
        
        };

    }, [email, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
       

        if (!complaint) {
            setMessage('Please enter your complaint');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/complaints/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, complaint })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Complaint submitted successfully');
            } else {
                setMessage(data.message || 'Failed to submit complaint');
            }
        } catch (error) {
            setMessage('Server error. Please try again later.');
        }

        setComplaint('');
    };

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h1 style={styles.title}>Submit a Complaint</h1>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <textarea
                        placeholder="Enter your complaint"
                        value={complaint}
                        onChange={(e) => setComplaint(e.target.value)}
                        rows="5"
                        style={styles.textarea}
                    />
                    <button type="submit" style={styles.button}>Submit</button>
                </form>
                {message && <p style={styles.message}>{message}</p>}
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'white',
        color: '#E0E0E0',
    },
    content: {
        flex: 1,
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        color: '#EF5D28',
        fontSize: '2rem',
        marginBottom: '2rem',
    },
    form: {
        width: '100%',
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textarea: {
        width: '100%',
        padding: '1rem',
        marginBottom: '1rem',
        backgroundColor: 'white',
        color: 'black',
        border: '1px solid #333',
        borderRadius: '4px',
        resize: 'vertical',
    },
    button: {
        padding: '0.5rem 1rem',
        backgroundColor: '#EF5D28',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'background-color 0.3s',
    },
    message: {
        marginTop: '1rem',
        padding: '0.5rem',
        borderRadius: '4px',
        backgroundColor: '#1E1E1E',
        border: '1px solid #333',
    },
};

export default Complains;