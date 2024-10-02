import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext.js';


function Cart() {
    const { email } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`/cart/${email}`);
                setCartItems(response.data);
            } catch (err) {
                setError('Failed to fetch cart items');
                console.error(err);
            }
        };

        fetchCartItems();
    }, [email]);

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
            <h2 style={styles.title}>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p style={styles.emptyCart}>Your cart is empty</p>
            ) : (
                <table style={styles.cartTable}>
                    <thead>
                        <tr>
                            <th style={styles.header}>Product</th>
                            <th style={styles.header}>Price</th>
                            <th style={styles.header}>Quantity</th>
                            <th style={styles.header}>Subtotal</th>
                            <th style={styles.header}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(item => (
                            <tr key={item.productId} style={styles.cartItemRow}>
                                <td style={styles.productInfo}>
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        style={styles.productImage}
                                    />
                                    <span style={styles.productName}>{item.name}</span>
                                </td>
                                <td style={styles.productPrice}>${item.price.toFixed(2)}</td>
                                <td style={styles.quantityContainer}>
                                    <button
                                        style={styles.quantityButton}
                                        onClick={() => decreaseQuantity(item.productId)}
                                    >
                                        -
                                    </button>
                                    <span style={styles.quantityText}>{item.quantity}</span>
                                    <button
                                        style={styles.quantityButton}
                                        onClick={() => increaseQuantity(item.productId)}
                                    >
                                        +
                                    </button>
                                </td>
                                <td style={styles.subtotal}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </td>
                                <td style={styles.removeCell}>
                                <button
    style={styles.removeButton}
    onClick={() => removeFromCart(item.productId)}
>
    <span style={{ ...styles.icon, marginRight: '8px' }}>
        <FontAwesomeIcon icon={faTrash} />
    </span>
    Remove
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
                        Subtotal: ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                    </p>
                    <p style={styles.total}>
                        Tax: ${(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.1).toFixed(2)}
                    </p>
                    <p style={styles.total}>
                        Total: ${(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 1.1).toFixed(2)}
                    </p>
                    <Link to="/checkout" className="btn btn-primary" style={{ fontSize: "20px", fontWeight: "bold", color: "white", backgroundColor: "#EF5B2B", border: "2px solid white" }}>CHECKOUT</Link>
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
        borderRadius: '8px',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#EF5B2B',
        fontSize: '24px',
    },
    emptyCart: {
        textAlign: 'center',
        fontStyle: 'italic',
    },
    cartTable: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '30px',
    },
    header: {
        backgroundColor: '#EF5B2B',
        color: '#fff',
        padding: '12px',
        fontSize: '16px',
        textAlign: 'left',
    },
    cartItemRow: {
        borderBottom: '1px solid #ddd',
        padding: '15px 0',
    },
    productInfo: {
        display: 'flex',
        alignItems: 'center',
    },
    productImage: {
        width: '80px',
        height: '80px',
        objectFit: 'cover',
        borderRadius: '8px',
        marginRight: '15px',
    },
    productName: {
        fontSize: '16px',
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: '16px',
        padding: '12px',
    },
    quantityContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '-10px', // Adjusting the position to move it up
    },
    quantityButton: {
        padding: '5px 10px',
        backgroundColor: '#EF5B2B',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    quantityText: {
        padding: '0 10px',
        fontSize: '16px',
    },
    subtotal: {
        fontSize: '16px',
        padding: '12px',
        fontWeight: 'bold',
    },
    removeCell: {
        padding: '12px',
    },
    trashIcon: {
        marginRight: '5px',
    },
    removeButton: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 15px',
        backgroundColor: '#ff4d4d', // Changed color to a softer red
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    summary: {
        textAlign: 'right',
    },
    total: {
        fontSize: '18px',
        marginBottom: '10px',
    },
    checkoutButton: {
        padding: '12px 20px',
        backgroundColor: '#EF5B2B',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default Cart;
