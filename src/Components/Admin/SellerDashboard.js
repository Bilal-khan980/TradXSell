// SellerDashboard.js

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import SideNavbar from './SideNavbar.js'; // Import the SideNavbar component

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SellerDashboard = () => {
  const sellerEmail = 'seller@g.com'; // Replace with actual logged-in seller's email
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await fetch(`/seller/total-products/${sellerEmail}`);
        const orderResponse = await fetch(`/seller/total-orders/${sellerEmail}`);
        const reviewResponse = await fetch(`/seller/total-reviews/${sellerEmail}`);

        const productData = await productResponse.json();
        const orderData = await orderResponse.json();
        const reviewData = await reviewResponse.json();

        setTotalProducts(productData.totalProducts);
        setTotalOrders(orderData.totalOrders);
        setTotalReviews(reviewData.totalReviews);
      } catch (error) {
        console.error('Error fetching seller data:', error);
      }
    };

    fetchData();
  }, [sellerEmail]);

  // Data for the bar chart
  const data = {
    labels: ['Products', 'Orders', 'Reviews'],
    datasets: [
      {
        label: 'Total Count',
        data: [totalProducts, totalOrders, totalReviews],
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800'],
        borderColor: ['#388e3c', '#1976d2', '#f57c00'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Dashboard Overview',
      },
    },
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <SideNavbar /> {/* Use the SideNavbar component here */}
      <main style={{
        flex: 1,
        padding: '20px',
        backgroundColor: '#ecf0f1',
      }}>
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}>
          <h1>Welcome to your Dashboard</h1>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>User Name</span>
            <img src="/path/to/profile-pic.jpg" alt="Profile" style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              marginLeft: '10px',
            }} />
          </div>
        </header>
        <section style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            flex: '1',
            marginRight: '10px',
            textAlign: 'center',
          }}>
            <h3>Total Products</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalProducts}</p>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            flex: '1',
            marginRight: '10px',
            textAlign: 'center',
          }}>
            <h3>Total Orders</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalOrders}</p>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            flex: '1',
            textAlign: 'center',
          }}>
            <h3>Total Reviews</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalReviews}</p>
          </div>
        </section>
        <section style={{
          marginTop: '20px',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}>
          <h2>Overview Chart</h2>
          <Bar data={data} options={options} />
        </section>
      </main>
    </div>
  );
};

export default SellerDashboard;
