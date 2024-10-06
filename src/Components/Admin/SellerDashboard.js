import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext.js'; // Import the AuthContext
import { Line } from 'react-chartjs-2'; // Import the Line component
import SideNavbar from './SideNavbar.js';

// Register the LineChart components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, LineController, Title, Tooltip, Legend);

const SellerDashboard = () => {
  // const sellerEmail = 'seller@g.com'; // Replace with actual logged-in seller's email
  const [totalProducts, setTotalProducts] = useState(0);
  const { email: sellerEmail } = useContext(AuthContext);
  const [recentReviews, setRecentReviews] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [dailyOrders, setDailyOrders] = useState(new Array(31).fill(0)); // Initialize with zeros for 31 days

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await fetch(`/seller/total-products/${sellerEmail}`);
        const orderResponse = await fetch(`/seller/total-orders/${sellerEmail}`);
        const reviewResponse = await fetch(`/seller/total-reviews/${sellerEmail}`);
        const recentReviewsResponse = await fetch(`/seller/recent-reviews/${sellerEmail}`);
        
        // Fetch daily orders data
        const dailyOrdersResponse = await fetch(`/seller/daily-orders/${sellerEmail}`);
        
        // Handle responses
        const productData = await productResponse.json();
        const orderData = await orderResponse.json();
        const reviewData = await reviewResponse.json();
        const dailyOrdersData = await dailyOrdersResponse.json();
        const recentReviewsData = await recentReviewsResponse.json();

        setTotalProducts(productData.totalProducts);
        setTotalOrders(orderData.totalOrders);
        setTotalReviews(reviewData.totalReviews);
        setRecentReviews(recentReviewsData);

        // Directly use the fetched daily orders data as the state
        setDailyOrders(dailyOrdersData); // Set daily orders data directly
      } catch (error) {
        console.error('Error fetching seller data:', error);
      }
    };

    fetchData();
  }, [sellerEmail]);

  // Data for the line chart (number of orders vs. days of the current month)
  const lineData = {
    labels: Array.from({ length: 31 }, (_, i) => i + 1), // Days of the month (1 to 31)
    datasets: [
      {
        label: 'Number of Orders',
        data: dailyOrders, // Daily orders data
        fill: false,
        borderColor: '#2196f3',
        tension: 0.1,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Number of Orders vs. Day of the Month',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0, // Start Y-axis from 0
        max: Math.max(...dailyOrders) + 1, // Dynamically set Y-axis max to highest order count
      },
      x: {
        title: {
          display: true,
          text: 'Days of the Month',
        },
      },
    },
  };

  return (
    <div style={{ display: 'flex' }}>
      <SideNavbar />
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
          display: 'flex',
          gap: '20px',
          marginTop: '20px',
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            flex: '1',
            height: '300px',
          }}>
            <h3>Daily Orders</h3>
            <div style={{ height: '100%' }}>
              <Line data={lineData} options={lineOptions} />
            </div>
            <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          }}>
             <h2>Recent Reviews</h2>
  {recentReviews.length === 0 ? (
    <p>No recent reviews.</p>
  ) : (
    <div>
      {recentReviews.map(review => (
        <div key={review._id} style={{ marginBottom: '10px' }}>
          <strong>{review.username}</strong>: {review.review}
        </div>
      ))}
    </div>
  )}
  </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SellerDashboard;
