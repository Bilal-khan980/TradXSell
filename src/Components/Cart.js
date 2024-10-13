import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.js';

function Cart() {
    const { email } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        // Redirect if email is null
        if (!email) {
            navigate('/loginpage'); // Redirect to the desired page
            return; // Exit the effect
        }

        const fetchCartItems = async () => {
            try {
                console.log('EMAIL', email);
                const response = await axios.get(`/cart/${email}`);
                setCartItems(response.data);
            } catch (err) {
                setError('Failed to fetch cart items');
                console.error(err);
            }
        };

        fetchCartItems();
    }, [email, navigate]); // Include navigate in dependencies

    const increaseQuantity = async (productId) => {
        try {
            await axios.post('/cart/increase', { email, productId });
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } catch (err) {
            console.error('Error increasing quantity:', err);
        }
    };

    const decreaseQuantity = async (productId) => {
        try {
            await axios.post('/cart/decrease', { email, productId });
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.productId === productId && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            );
        } catch (err) {
            console.error('Error decreasing quantity:', err);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await axios.delete(`/cart/remove/${email}/${productId}`);
            setCartItems(prevItems =>
                prevItems.filter(item => item.productId !== productId)
            );
        } catch (err) {
            console.error('Error removing item:', err);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>YOUR CART</h2>
            {cartItems.length === 0 ? (
                <p style={styles.emptyCart}>Your cart is empty</p>
            ) : (
                <table style={styles.cartTable}>
                    <thead>
                        <tr>
                            <th style={{ ...styles.header, paddingLeft: 55 }}>PRODUCT</th>
                            <th style={styles.header}>PRICE</th>
                            <th style={{ ...styles.header, paddingLeft: 55 }}>QUANTITY</th>
                            <th style={{ ...styles.header, paddingLeft: 55 }}>SIZE</th>
                            <th style={{ ...styles.header, paddingLeft: 55 }}>COLOUR</th>
                            <th style={{ ...styles.header, paddingLeft: 10 }}>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(item => (
                            <tr key={item.productId} style={styles.cartItemRow}>
                                <td style={{ ...styles.productInfo, paddingTop: 10 }}>
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        style={styles.productImage}
                                    />
                                    <span style={styles.productName}>{item.name}</span>
                                </td>
                                <td style={styles.subtotal}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </td>
                                <td style={{ paddingLeft: 60 }}>
                                    <button style={styles.quantityButton} onClick={() => increaseQuantity(item.productId)}>+</button>
                                    <div style={{paddingLeft : 5, display: 'inline-block' }}></div>
                                    <div style={{ paddingRight: 7, display: 'inline-block' }}>{item.quantity}</div>
                                    <button style={styles.quantityButton} onClick={() => decreaseQuantity(item.productId)}>-</button>
                                </td>

                                <td>
    <div style={{ paddingLeft: 20 }}>
        <span style={{ ...styles.cartItemRow, paddingLeft: 40 }}>
            {item.size === 'null' ? '-' : item.size}
        </span>
    </div>
</td>
<td>
    <div style={{ paddingLeft: 70 }}>
        <span style={styles.cartItemRow}>
            {item.color === 'null' ? '-' : item.color}
        </span>
    </div>
</td>


                                <td style={{ ...styles.removeCell, paddingRight: 10 }}>
                                    <button
                                        style={styles.removeButton}
                                        onClick={() => removeFromCart(item.productId)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} style={{ ...styles.icon, paddingLeft: 4 }} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {cartItems.length > 0 && (
                <div style={styles.summary}>
                    <p style={styles.total}>
                        Total: ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                    </p>
                    {/* <p style={styles.total}>
                        Tax: ${(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.1).toFixed(2)}
                    </p>
                    <p style={styles.total}>
                        Total: ${(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 1.1).toFixed(2)}
                    </p> */}
                    <Link to="/checkout" className="btn btn-primary" style={styles.checkoutButton}>
                        CHECKOUT
                    </Link>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        width: '90%',
        margin: '40px auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#EF5B2B',
        fontSize: '24px',
        fontWeight: 'bold',
    },
    emptyCart: {
        textAlign: 'center',
        fontStyle: 'italic',
        fontSize: '18px',
        color: '#666',
    },
    cartTable: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '30px',
    },
    header: {
        backgroundColor: '#EF5B2B',
        color: '#fff',
        padding: '15px',
        fontSize: '16px',
        textAlign: 'left',
    },
    cartItemRow: {
        borderBottom: '1px solid #ddd',
        padding: '20px 0',
        height: '120px',
    },
    productInfo: {
        display: 'flex',
        alignItems: 'center',
    },
    productImage: {
        width: '100px',
        height: '100px',
        objectFit: 'cover',
        borderRadius: '8px',
        marginRight: '15px',
    },
    productName: {
        fontSize: '16px',
        fontWeight: 'bold',
    },
    subtotal: {
        fontSize: '16px',
        padding: '12px',
        fontWeight: 'bold',
    },
    removeCell: {
        padding: '12px',
    },
    removeButton: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 15px',
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    icon: {
        marginRight: '8px',
    },
    summary: {
        textAlign: 'right',
    },
    total: {
        fontSize: '18px',
        marginBottom: '10px',
        color: '#333',
    },
    checkoutButton: {
        padding: '12px 20px',
        backgroundColor: '#EF5B2B',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
    },
};

export default Cart;
