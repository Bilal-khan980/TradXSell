import React, { useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext.js';
import { useContext } from 'react';
import axios from 'axios';

function UserDashboard() {
    // Context
    const { id } = useContext(AuthContext);

    // State variables for current user data
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    // State variables for edit mode
    const [editField, setEditField] = useState(null);
    const [newValue, setNewValue] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');

    // Fetch user details on component mount or when id changes
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

    // Handle edit button click
    const handleEditClick = (field) => {
        setEditField(field);
        setNewValue('');
    };

    // Save changes when editing a field
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

            // Update local state with new data
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

            // Display update message
            setUpdateMessage(`${editField.charAt(0).toUpperCase() + editField.slice(1)} updated successfully!`);

            // Exit edit mode
            setEditField(null);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    // Cancel edit
    const cancelEdit = () => {
        setEditField(null);
    };

    return (
        <div className='home-container' style={{ backgroundColor: "black", height: "100vh" }}>
            <h1 style={{ color: "yellow", textAlign: "center" }}>Welcome {username}!</h1>
            <div style={{ paddingTop: "60px", paddingLeft: "40px" }}>
                {updateMessage && <p style={{ color: "green" }}>{updateMessage}</p>}
                <div style={{ fontSize: "30px" }}>
                    <span style={{ color: "yellow" }}>USERNAME :</span>
                    {editField === 'username' ? (
                        <span>
                            <input type="text" value={newValue} onChange={(e) => setNewValue(e.target.value)} />
                            <button onClick={saveChanges} style={{ marginLeft: "10px" }}>Save</button>
                            <button onClick={cancelEdit} style={{ marginLeft: "10px" }}>Cancel</button>
                        </span>
                    ) : (
                        <span>
                            <span style={{ color: "white", paddingLeft: "50px" }}>{username}</span>
                            <button onClick={() => handleEditClick('username')} style={{ marginLeft: "10px" }}>Edit</button>
                        </span>
                    )}
                </div>

                <div style={{ fontSize: "30px" }}>
                    <span style={{ color: "yellow" }}>EMAIL :</span>
                    {editField === 'email' ? (
                        <span>
                            <input type="email" value={newValue} onChange={(e) => setNewValue(e.target.value)} />
                            <button onClick={saveChanges} style={{ marginLeft: "10px" }}>Save</button>
                            <button onClick={cancelEdit} style={{ marginLeft: "10px" }}>Cancel</button>
                        </span>
                    ) : (
                        <span>
                            <span style={{ color: "white", paddingLeft: "110px" }}>{email}</span>
                            <button onClick={() => handleEditClick('email')} style={{ marginLeft: "10px" }}>Edit</button>
                        </span>
                    )}
                </div>

                <div style={{ fontSize: "30px" }}>
                    <span style={{ color: "yellow" }}>ADDRESS :</span>
                    {editField === 'address' ? (
                        <span>
                            <input type="text" value={newValue} onChange={(e) => setNewValue(e.target.value)} />
                            <button onClick={saveChanges} style={{ marginLeft: "10px" }}>Save</button>
                            <button onClick={cancelEdit} style={{ marginLeft: "10px" }}>Cancel</button>
                        </span>
                    ) : (
                        <span>
                            <span style={{ color: "white", paddingLeft: "72px" }}>{address}</span>
                            <button onClick={() => handleEditClick('address')} style={{ marginLeft: "10px" }}>Edit</button>
                        </span>
                    )}
                </div>

                <div style={{ fontSize: "30px" }}>
                    <span style={{ color: "yellow" }}>PHONE # :</span>
                    {editField === 'phoneNumber' ? (
                        <span>
                            <input type="text" value={newValue} onChange={(e) => setNewValue(e.target.value)} />
                            <button onClick={saveChanges} style={{ marginLeft: "10px" }}>Save</button>
                            <button onClick={cancelEdit} style={{ marginLeft: "10px" }}>Cancel</button>
                        </span>
                    ) : (
                        <span>
                            <span style={{ color: "white", paddingLeft: "75px" }}>{phoneNumber}</span>
                            <button onClick={() => handleEditClick('phoneNumber')} style={{ marginLeft: "10px" }}>Edit</button>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
