import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext.js';

function ManageOrders() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const { email: sellerEmail } = useContext(AuthContext);
    const [productSellerEmails, setProductSellerEmails] = useState({});

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/orders');
                setOrders(response.data);
                fetchProductSellerEmails(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Failed to fetch orders');
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
        return deliveryDate.toDateString();
    };

    const calculateTotalCost = (items) => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleItemStatusUpdate = async (orderId, productId, status) => {
        try {
            await axios.put(`/orders/${orderId}/items/${productId}/status`, { status });
            const response = await axios.get('/orders');  // Fetch updated orders
            setOrders(response.data);
        } catch (error) {
            console.error('Error updating item status:', error);
            setError('Failed to update item status');
        }
    };

    if (error) {
        return <div style={{ color: 'white', textAlign: 'center', paddingTop: '20px' }}>Error: {error}</div>;
    }

    if (orders.length === 0) {
        return <div style={{ color: 'white', textAlign: 'center', paddingTop: '20px' }}>Loading orders...</div>;
    }

    return (
        <div className="container-fluid" style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white' }}>
            <div className="container py-5">
                <h2 className="mb-4" style={{ color: 'yellow', fontWeight: 'bold', textAlign: 'center' }}>MANAGE ORDERS</h2>
                {orders.map(order => {
                    const sellerItems = order.items.filter(item => productSellerEmails[item.productId] === sellerEmail);

                    if (sellerItems.length === 0) return null;

                    return (
                        <div key={order._id} className="card mb-4" style={{ backgroundColor: 'black', border: '4px solid white', borderRadius: '10px' }}>
                            <div className="card-header" style={{ backgroundColor: 'black', color: 'white' }}>
                                <h5 className="card-title" style={{ color: 'yellow', fontWeight: 'bold' }}>Order #{order._id}</h5>
                                <p>Name: {order.username}</p>
                                <p>Email: {order.email}</p>
                                <p>Order Date: {new Date(order.orderDate).toDateString()}</p>
                                <p>Estimated Delivery Date: {calculateDeliveryDate(order.orderDate)}</p>
                                <p>Total Cost: ${calculateTotalCost(order.items)}</p>
                            </div>
                            <div className="card-body">
                                <h5 style={{ color: 'yellow' }}>Items:</h5>
                                {sellerItems.map(item => (
                                    <div key={item.productId} className="row mb-3">
                                        <div className="col-2">
                                            <img src={item.imageUrl} alt={item.name} className="img-fluid" />
                                        </div>
                                        <div className="col-4 d-flex align-items-center">
                                            <p>{item.name}</p>
                                        </div>
                                        <div className="col-2 d-flex align-items-center">
                                            <p>Quantity: {item.quantity}</p>
                                        </div>
                                        <div className="col-2 d-flex align-items-center">
                                            <p>Price: ${item.price}</p>
                                        </div>
                                        <div className="col-2 d-flex align-items-center">
                                            <select 
                                                value={item.status} 
                                                onChange={(e) => handleItemStatusUpdate(order._id, item.productId, e.target.value)} 
                                                className="form-select"
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
