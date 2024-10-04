import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthContext.js';

function ManageOrders() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const { email: sellerEmail } = useContext(AuthContext);
    const [productSellerEmails, setProductSellerEmails] = useState({});
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

    const calculateDeliveryDate = (orderDate) => {
        const deliveryDate = new Date(orderDate);
        deliveryDate.setDate(deliveryDate.getDate() + 5);
        return deliveryDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

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
        return <div className="error-message">Error: {error}</div>;
    }

    if (loading) {
        return <div className="loading-message">Loading orders...</div>;
    }

    return (
        <div className="manage-orders">
            <style jsx>{`
                .manage-orders {
                    background-color: #ffffff;
                    min-height: 100vh;
                    padding: 2rem 0;
                }
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }
                .page-title {
                    color: #EF5B2B;
                    font-weight: bold;
                    text-align: center;
                    margin-bottom: 2rem;
                    font-size: 2.5rem;
                }
                .order-card {
                    background-color: #ffffff;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    margin-bottom: 2rem;
                    overflow: hidden;
                }
                .order-header {
                    background-color: #f8f8f8;
                    padding: 1.5rem;
                    border-bottom: 1px solid #e0e0e0;
                }
                .order-title {
                    color: #EF5B2B;
                    font-weight: bold;
                    margin-bottom: 1rem;
                    font-size: 1.5rem;
                }
                .order-details p {
                    margin-bottom: 0.5rem;
                }
                .order-items {
                    padding: 1.5rem;
                }
                .order-items h3 {
                    color: #EF5B2B;
                    margin-bottom: 1rem;
                    font-size: 1.2rem;
                }
                .item-row {
                    display: flex;
                    align-items: center;
                    margin-bottom: 1rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid #e0e0e0;
                }
                .item-image {
                    width: 80px;
                    height: 80px;
                    margin-right: 1rem;
                }
                .item-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 4px;
                }
                .item-details {
                    flex-grow: 1;
                }
                .item-details h4 {
                    margin-bottom: 0.5rem;
                    font-size: 1.1rem;
                }
                .item-status {
                    min-width: 120px;
                }
                .status-select {
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid #e0e0e0;
                    border-radius: 4px;
                    background-color: #ffffff;
                }
                .error-message,
                .loading-message {
                    color: #EF5B2B;
                    text-align: center;
                    padding-top: 2rem;
                    font-size: 1.2rem;
                }
            `}</style>
            <div className="container">
                <h1 className="page-title">Manage Orders</h1>
                {orders.map(order => {
                    const sellerItems = order.items.filter(item => productSellerEmails[item.productId] === sellerEmail);

                    if (sellerItems.length === 0) return null;

                    return (
                        <div key={order._id} className="order-card">
                            <div className="order-header">
                                <h2 className="order-title">Order #{order._id}</h2>
                                <div className="order-details">
                                    <p><strong>Name:</strong> {order.username}</p>
                                    <p><strong>Email:</strong> {order.email}</p>
                                    <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <p><strong>Estimated Delivery:</strong> {calculateDeliveryDate(order.orderDate)}</p>
                                    <p><strong>Total Cost:</strong> ${calculateTotalCost(order.items)}</p>
                                </div>
                            </div>
                            <div className="order-items">
                                <h3>Items:</h3>
                                {sellerItems.map(item => (
                                    <div key={item.productId} className="item-row">
                                        <div className="item-image">
                                            <img src={item.imageUrl} alt={item.name} />
                                        </div>
                                        <div className="item-details">
                                            <h4>{item.name}</h4>
                                            <p>Quantity: {item.quantity}</p>
                                            <p>Price: ${item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="item-status">
                                            <select 
                                                value={item.status} 
                                                onChange={(e) => handleItemStatusUpdate(order._id, item.productId, e.target.value)} 
                                                className="status-select"
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
    );
}

export default ManageOrders;