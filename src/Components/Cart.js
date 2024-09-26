// src/Components/Cart.js

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import Footer from './footer';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { loggedIn, email } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (loggedIn) {
            const fetchCartItems = async () => {
                try {
                    const response = await axios.get(`/cart/${email}`);
                    setCartItems(response.data);
                } catch (error) {
                    console.error('Error fetching cart items:', error);
                    setError('Failed to fetch cart items');
                }
            };

            fetchCartItems();
        }
    }, [loggedIn, email]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!loggedIn) {
        return (
            <div style={{ backgroundColor: "black", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h1 style={{ color: "yellow", textAlign: "center", fontWeight: "bold" }}>PLEASE LOGIN</h1>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div style={{ backgroundColor: "black", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h1 style={{ color: "yellow", textAlign: "center", fontWeight: "bold" }}>CART IS EMPTY</h1>
            </div>
        );
    }

    const calculateTotalBill = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div style={{ backgroundColor: "black", height: "100vh" }}>
            <div className="cart-container" style={{ backgroundColor: "black", height: "100vh" }}>
                <div className="container" style={{ paddingTop: "60px" }}>
                    <h1 style={{ color: "yellow", textAlign: "center", fontWeight: "bold" }}>CART</h1>
                    {cartItems.map(item => (
                        <div key={item._id} className="cart-item" style={{ display: "flex", justifyContent: "left", padding: "20px", borderBottom: "1px solid white" }}>
                            <img src={item.imageUrl} alt={item.name} style={{ width: "100px", borderRadius: "10px" }} />
                            <div style={{ color: "white", textAlign: "left", paddingLeft: "100px" }}>
                                <h3>{item.name}</h3>
                                <p>{item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                        </div>
                    ))}
                    <div style={{ color: "white", textAlign: "right", padding: "20px", fontWeight: "bold" }}>
                        Total Bill: ${calculateTotalBill().toFixed(2)}
                    </div>
                    <div style={{ backgroundColor: "black", paddingLeft: "1170px", width: "300px" }}>
                        <Link to="/checkout" className="btn btn-primary" style={{ fontSize: "20px", fontWeight: "bold", color: "yellow", backgroundColor: "black", border: "2px solid white" }}>CHECKOUT</Link>
                    </div>
                </div>

                <div style={{ backgroundColor: "black", paddingTop: "70px" }}>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Cart;
