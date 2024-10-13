import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { AuthContext } from '../../AuthContext.js';
import SideNavbar from './SideNavbar.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, LineController, Title, Tooltip, Legend);

const SellerDashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const { email: sellerEmail } = useContext(AuthContext);
  const { username: sellerusername } = useContext(AuthContext);
  const [recentReviews, setRecentReviews] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [dailyOrders, setDailyOrders] = useState(new Array(31).fill(0));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await fetch(`/seller/total-products/${sellerEmail}`);
        const orderResponse = await fetch(`/seller/total-orders/${sellerEmail}`);
        const reviewResponse = await fetch(`/seller/total-reviews/${sellerEmail}`);
        const recentReviewsResponse = await fetch(`/seller/recent-reviews/${sellerEmail}`);
        const dailyOrdersResponse = await fetch(`/seller/daily-orders/${sellerEmail}`);
        
        const productData = await productResponse.json();
        const orderData = await orderResponse.json();
        const reviewData = await reviewResponse.json();
        const dailyOrdersData = await dailyOrdersResponse.json();
      const recentReviewsData = await recentReviewsResponse.json();

        setTotalProducts(productData.totalProducts);
        setTotalOrders(orderData.totalOrders);
        setTotalReviews(reviewData.totalReviews);
        setRecentReviews(Array.isArray(recentReviewsData) ? recentReviewsData : []); 
    
        setDailyOrders(dailyOrdersData);
      } catch (error) {
        console.error('Error fetching seller data:', error);
      }
    };

    fetchData();
  }, [sellerEmail,sellerusername]);

  const lineData = {
    labels: Array.from({ length: 31 }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Number of Orders',
        data: dailyOrders,
        fill: false,
        borderColor: '#EF5B2B',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
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
        labels: {
          color: '#E0E0E0',
        },
      },
      title: {
        display: true,
        text: 'Number of Orders vs. Day of the Month',
        color: '#E0E0E0',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: Math.max(...dailyOrders) + 1,
        ticks: {
          color: '#E0E0E0',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Days of the Month',
          color: '#E0E0E0',
        },
        ticks: {
          color: '#E0E0E0',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#121212', color: '#E0E0E0', minHeight: '100vh' }}>
      <SideNavbar />
      <main style={{
        flex: 1,
        padding: '20px',
      }}>
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          borderBottom: '1px solid #333',
          paddingBottom: '10px',
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Seller Dashboard</h1>
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
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          marginBottom: '20px',
        }}>
          {[
            { title: 'Total Products', value: totalProducts },
            { title: 'Total Orders', value: totalOrders },
            { title: 'Total Reviews', value: totalReviews },
          ].map((item, index) => (
            <div key={index} style={{
              backgroundColor: '#1E1E1E',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
            }}>
              <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>{item.title}</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#EF5B2B' }}>{item.value}</p>
            </div>
          ))}
        </section>
        <section style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '20px',
        }}>
          <div style={{
            backgroundColor: '#1E1E1E',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}>
            <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Daily Orders</h3>
            <div style={{ height: '300px' }}>
               <Line data={lineData} options={lineOptions} />
            </div>
          </div>
          <div style={{
            backgroundColor: '#1E1E1E',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            maxHeight: '380px',
            overflowY: 'auto',
          }}>
            <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Recent Reviews</h3>
            {recentReviews.length === 0 ? (
              <p>No recent reviews.</p>
            ) : (
              recentReviews.map(review => (
                <div key={review._id} style={{ marginBottom: '10px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                  <strong style={{ color: '#EF5B2B' }}>{review.username}</strong>: {review.review}
                </div>
              ))
            )} 
          </div>
        </section>
      </main>
    </div>
  );
};

export default SellerDashboard;