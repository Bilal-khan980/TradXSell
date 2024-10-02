import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext'; // Assuming you have an AuthContext for managing user authentication

function UserOrders() {
    const { email, loggedIn } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`/orders/${email}`);
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Failed to fetch orders');
            }
        };

        fetchOrders();
    }, [email]);

    if (error) {
        return <div style={{ color: 'white', textAlign: 'center', paddingTop: '20px' }}>Error: {error}</div>;
    }

    if (!loggedIn) {
        return (
            <div style={{ backgroundColor: "black", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h1 style={{ color: "yellow", textAlign: "center", fontWeight: "bold" }}>PLEASE LOGIN</h1>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div style={{ backgroundColor: "black", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h1 style={{ color: "yellow", textAlign: "center", fontWeight: "bold" }}>NO ORDER PLACED</h1>
            </div>
        );
    }

    return (
        <div className="container-fluid" style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', paddingTop: '50px' }}>
            <div className="container">
                <h2 className="mb-4" style={{ color: '#EF5B2B', fontWeight: 'bold', textAlign: 'center', fontSize: '2.5rem' }}>Your Orders</h2>
                {orders.map(order => (
                    <div key={order._id} className="card mb-4 shadow-sm" style={{ border: 'none', borderRadius: '12px' }}>
                        <div className="card-header d-flex justify-content-between align-items-center" style={{ backgroundColor: '#EF5B2B', color: 'white', borderRadius: '12px 12px 0 0' }}>
                            <h5 className="card-title mb-0">Order #{order._id}</h5>
                            <p className="mb-0">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                        </div>
                        <div className="card-body" style={{ backgroundColor: 'white', borderRadius: '0 0 12px 12px' }}>
                            <table className="table table-bordered text-center">
                                <thead style={{ backgroundColor: '#EF5B2B', color: 'white' }}>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.items.map(item => (
                                        <tr key={item.productId}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <img src={item.imageUrl} alt={item.name} className="img-fluid rounded" style={{ maxHeight: '60px', marginRight: '10px' }} />
                                                    <span style={{ fontWeight: 'bold', color: '#333' }}>{item.name}</span>
                                                </div>
                                            </td>
                                            <td style={{paddingTop : 20}}>{item.quantity}</td>
                                            <td style={{paddingTop : 20}}>${item.price * item.quantity}</td>
                                            <td>
                                                <span className={`badge ${item.status === 'Delivered' ? 'badge-success' : 'badge-warning'}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserOrders;
