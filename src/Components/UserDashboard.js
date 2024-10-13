import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext.js';

function UserDashboard() {
    const { id } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [editField, setEditField] = useState(null);
    const [newValue, setNewValue] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const response = await axios.get(`/users/userdetails/${id}`);
                setUsername(response.data.user.username);
                setEmail(response.data.user.email);
                setAddress(response.data.user.address);
                setPhoneNumber(response.data.user.phoneNumber);
            } catch (error) {
                console.error('Error fetching info:', error);
            }
        };

        if (id) {
            fetchInfo();
        }
    }, [id]);

    const handleEditClick = (field) => {
        setEditField(field);
        setNewValue('');
    };

    const saveChanges = async () => {
        try {
            const updatedData = {
                username,
                email,
                address,
                phoneNumber
            };

            updatedData[editField] = newValue;
            await axios.put(`/users/update/${id}`, updatedData);

            switch (editField) {
                case 'username':
                    setUsername(newValue);
                    break;
                case 'email':
                    setEmail(newValue);
                    break;
                case 'address':
                    setAddress(newValue);
                    break;
                case 'phoneNumber':
                    setPhoneNumber(newValue);
                    break;
                default:
                    break;
            }

            setUpdateMessage(`${editField.charAt(0).toUpperCase() + editField.slice(1)} updated successfully!`);
            setEditField(null);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const cancelEdit = () => {
        setEditField(null);
    };

    return (
        <div className='home-container' style={{ backgroundColor: "white", height: "100vh", padding: "20px" }}>
            <h1 style={{ color: "#EF5B2B", textAlign: "center", fontWeight: "bold", marginBottom: "40px" }}>Welcome, {username}!</h1>
            <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", borderRadius: "10px", backgroundColor: "#f9f9f9", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)" }}>
                {updateMessage && <p style={{ color: "#28a745", textAlign: "center", fontSize: "18px", marginBottom: "20px" }}>{updateMessage}</p>}
                <div style={{ marginBottom: "20px", fontSize: "18px", color: "#333" }}>
                    <span style={{ fontWeight: "bold", color: "#EF5B2B" }}>Username:</span>
                    {editField === 'username' ? (
                        <span>
                            <input type="text" value={newValue} onChange={(e) => setNewValue(e.target.value)} style={{ marginLeft: "10px", padding: "5px", fontSize: "16px" }} />
                            <button onClick={saveChanges} style={buttonStyle}>Save</button>
                            <button onClick={cancelEdit} style={buttonStyle}>Cancel</button>
                        </span>
                    ) : (
                        <span style={{ marginLeft: "10px" }}>{username}
                            <button onClick={() => handleEditClick('username')} style={editButtonStyle}>Edit</button>
                        </span>
                    )}
                </div>

                <div style={{ marginBottom: "20px", fontSize: "18px", color: "#333" }}>
                    <span style={{ fontWeight: "bold", color: "#EF5B2B" }}>Email:</span>
                    {editField === 'email' ? (
                        <span>
                            <input type="email" value={newValue} onChange={(e) => setNewValue(e.target.value)} style={{ marginLeft: "10px", padding: "5px", fontSize: "16px" }} />
                            <button onClick={saveChanges} style={buttonStyle}>Save</button>
                            <button onClick={cancelEdit} style={buttonStyle}>Cancel</button>
                        </span>
                    ) : (
                        <span style={{ marginLeft: "10px" }}>{email}
                            <button onClick={() => handleEditClick('email')} style={editButtonStyle}>Edit</button>
                        </span>
                    )}
                </div>

                <div style={{ marginBottom: "20px", fontSize: "18px", color: "#333" }}>
                    <span style={{ fontWeight: "bold", color: "#EF5B2B" }}>Address:</span>
                    {editField === 'address' ? (
                        <span>
                            <input type="text" value={newValue} onChange={(e) => setNewValue(e.target.value)} style={{ marginLeft: "10px", padding: "5px", fontSize: "16px" }} />
                            <button onClick={saveChanges} style={buttonStyle}>Save</button>
                            <button onClick={cancelEdit} style={buttonStyle}>Cancel</button>
                        </span>
                    ) : (
                        <span style={{ marginLeft: "10px" }}>{address}
                            <button onClick={() => handleEditClick('address')} style={editButtonStyle}>Edit</button>
                        </span>
                    )}
                </div>

                <div style={{ marginBottom: "20px", fontSize: "18px", color: "#333" }}>
                    <span style={{ fontWeight: "bold", color: "#EF5B2B" }}>Phone #:</span>
                    {editField === 'phoneNumber' ? (
                        <span>
                            <input type="text" value={newValue} onChange={(e) => setNewValue(e.target.value)} style={{ marginLeft: "10px", padding: "5px", fontSize: "16px" }} />
                            <button onClick={saveChanges} style={buttonStyle}>Save</button>
                            <button onClick={cancelEdit} style={buttonStyle}>Cancel</button>
                        </span>
                    ) : (
                        <span style={{ marginLeft: "10px" }}>{phoneNumber}
                            <button onClick={() => handleEditClick('phoneNumber')} style={editButtonStyle}>Edit</button>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

const buttonStyle = {
    marginLeft: "10px",
    padding: "5px 10px",
    fontSize: "14px",
    backgroundColor: "#EF5B2B",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
};

const editButtonStyle = {
    marginLeft: "20px",
    padding: "3px 8px",
    fontSize: "14px",
    backgroundColor: "white",
    color: "#EF5B2B",
    border: "2px solid #EF5B2B",
    borderRadius: "5px",
    cursor: "pointer"
};

export default UserDashboard;
