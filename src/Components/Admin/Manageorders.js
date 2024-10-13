import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthContext.js';
import SideNavbar from './SideNavbar';

function ManageOrders() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const { email: sellerEmail } = useContext(AuthContext);
    const [productSellerEmails, setProductSellerEmails] = useState({});
    const { username: sellerusername } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/orders');
                setOrders(response.data);
                fetchProductSellerEmails(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const fetchProductSellerEmails = async (orders) => {
        try {
            const productIds = [...new Set(orders.flatMap(order => order.items.map(item => item.productId)))];
            const emailPromises = productIds.map(async (productId) => {
                const product = await axios.get(`/products/${productId}`);
                return { productId, sellerEmail: product.data.sellerEmail };
            });

            const emailResults = await Promise.all(emailPromises);
            const emailMap = emailResults.reduce((acc, { productId, sellerEmail }) => {
                acc[productId] = sellerEmail;
                return acc;
            }, {});
            setProductSellerEmails(emailMap);
        } catch (error) {
            console.error('Error fetching product seller emails:', error);
        }
    };

    // const calculateDeliveryDate = (orderDate) => {
    //     const deliveryDate = new Date(orderDate);
    //     deliveryDate.setDate(deliveryDate.getDate() + 5);
    //     return deliveryDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    // };

    const calculateTotalCost = (items) => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleItemStatusUpdate = async (orderId, productId, status) => {
        try {
            await axios.put(`/orders/${orderId}/items/${productId}/status`, { status });
            const response = await axios.get('/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error updating item status:', error);
            setError('Failed to update item status');
        }
    };

    if (error) {
        return <div style={styles.errorMessage}>Error: {error}</div>;
    }

    if (loading) {
        return <div style={styles.loadingMessage}>Loading orders...</div>;
    }

    return (
        <div style={styles.manageOrders}>
            <SideNavbar />
            <main style={{ flex: 1, padding: '20px' }}>
                <header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                    borderBottom: '1px solid #333',
                    paddingBottom: '10px',
                }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Manage Orders</h2>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ marginRight: '10px' }}>{sellerusername}</span>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#EF5B2B',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                        }}>
                            {sellerusername.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </header>
            <div style={styles.container}>
                <div style={styles.ordersContainer}>
                    {orders.map(order => {
                        const sellerItems = order.items.filter(item => productSellerEmails[item.productId] === sellerEmail);

                        if (sellerItems.length === 0) return null;

                        return (
                            <div key={order._id} style={styles.orderCard}>
                                <div style={styles.orderHeader}>
                                    <h2 style={styles.orderTitle}>Order #{order._id}</h2>
                                    <div style={styles.orderDetails}>
                                        <p><strong>Name:</strong> {order.username}</p>
                                        <p><strong>Email:</strong> {order.email}</p>
                                        <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                        {/* <p><strong>Estimated Delivery:</strong> {calculateDeliveryDate(order.orderDate)}</p> */}
                                        <p><strong>Total Cost:</strong> ${calculateTotalCost(order.items)}</p>
                                    </div>
                                </div>
                                <div style={styles.orderItems}>
                                    <h3 style={styles.itemsTitle}>Items:</h3>
                                    {sellerItems.map(item => (
                                        <div key={item.productId} style={styles.itemRow}>
                                            <div style={styles.itemImage}>
                                                <img src={item.imageUrl} alt={item.name} style={styles.itemImg} />
                                            </div>
                                            <div style={styles.itemDetails}>
                                                <h4 style={styles.itemName}>{item.name}</h4>
                                                <p>Quantity: {item.quantity}</p>
                                                <p>Price: ${item.price.toFixed(2)}</p>
                                            </div>
                                            <div style={styles.itemStatus}>
                                                <select 
                                                    value={item.status} 
                                                    onChange={(e) => handleItemStatusUpdate(order._id, item.productId, e.target.value)} 
                                                    style={styles.statusSelect}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                </select>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            </main>
        </div>
    );
}

const styles = {
    manageOrders: {
        display: 'flex',
        backgroundColor: '#121212',
        minHeight: '100vh',
        color: '#E0E0E0',
    },
    container: {
        flexGrow: 1,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    },
    pageTitle: {
        color: 'white',
        fontWeight: 'bold',
        marginBottom: '2rem',
        fontSize: '2.5rem',
    },
    ordersContainer: {
        overflowY: 'scroll', // Enable vertical scrolling
        flex: 1,
        // Hide scrollbar styles
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // Internet Explorer and Edge
        '&::-webkit-scrollbar': {
            display: 'none', // Chrome, Safari, and Opera
        },
    },
    orderCard: {
        backgroundColor: '#1E1E1E',
        border: '1px solid #333',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        marginBottom: '2rem',
        overflow: 'hidden',
    },
    orderHeader: {
        backgroundColor: '#2C3E50',
        padding: '1.5rem',
        borderBottom: '1px solid #333',
    },
    orderTitle: {
        color: '#EF5B2B',
        fontWeight: 'bold',
        marginBottom: '1rem',
        fontSize: '1.5rem',
    },
    orderDetails: {
        '& p': {
            marginBottom: '0.5rem',
        },
    },
    orderItems: {
        padding: '1.5rem',
    },
    itemsTitle: {
        color: '#EF5B2B',
        marginBottom: '1rem',
        fontSize: '1.2rem',
    },
    itemRow: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #333',
    },
    itemImage: {
        width: '80px',
        height: '80px',
        marginRight: '1rem',
    },
    itemImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '4px',
    },
    itemDetails: {
        flexGrow: 1,
    },
    itemName: {
        marginBottom: '0.5rem',
        fontSize: '1.1rem',
        color: '#EF5B2B',
    },
    itemStatus: {
        minWidth: '120px',
    },
    statusSelect: {
        width: '100%',
        padding: '0.5rem',
        border: '1px solid #555',
        borderRadius: '4px',
        backgroundColor: '#333',
        color: '#E0E0E0',
    },
    errorMessage: {
        color: '#ff6b6b',
        textAlign: 'center',
        paddingTop: '2rem',
        fontSize: '1.2rem',
    },
    loadingMessage: {
        color: '#EF5B2B',
        textAlign: 'center',
        paddingTop: '2rem',
        fontSize: '1.2rem',
    },
};

export default ManageOrders;
