import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import calltoaction from './Assets/calltoaction.jpg';
import hero from './Assets/hero.png';
import logo from './Assets/herologo.png';
import Category from './Category.js';
import Footer from './footer.js';

function CallToAction() {
  return (
    <section style={{
      position: 'relative',
      color: 'white',
      padding: '60px 0',
      textAlign: 'center',
      backgroundImage: `url(${calltoaction})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '600px', // Adjusted height
      display: 'flex', // Use flexbox for centering
      flexDirection: 'column', // Stack items vertically
      justifyContent: 'center', // Center vertically
      alignItems: 'center', // Center horizontally
    }}>
      {/* Overlay for background image opacity */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1,
      }}></div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}> {/* Content above the overlay */}
        <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>Ready to get started?</h2> {/* Increased font size */}
        <p style={{ fontSize: '1.5rem', marginBottom: '30px' }}> {/* Increased font size */}
          Explore millions of products from trusted suppliers by signing up today!
        </p>
        <button style={{
          backgroundColor: 'white',
          color: '#EF5B2B',
          border: 'none',
          padding: '12px 30px',
          fontSize: '1.2rem', // Adjust button font size
          fontWeight: 'bold',
          borderRadius: '30px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}>
          Sign up
        </button>
      </div>
    </section>
  );
}


export default function Home() {
  const [products, setProducts] = useState([]);
  const counts = {
    products: 20000,
    suppliers: 2000,
    categories: 5900,
    countries: 200,
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products/approved/xx');
      console.log('Fetched products:', response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <>
      <div className="home-container"
        style={{
          backgroundColor: "white",
          backgroundImage: `url(${hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "90vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          position: "relative",
        }}>
        <img src={logo} style={{ position: 'relative', zIndex: '100', marginBottom: '20px' }} alt="Logo" />
        <div style={{
          width: '786px',
          height: '140px',
          zIndex: 1,
          opacity: 1,
        }}>
          <div className="ife-header-search-bar dark pc-home-search" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '40%',
            border: '1px solid #e5e7eb',
            borderRadius: '30px',
            padding: '0 10px',
            backgroundColor: '#fff',
            position: 'relative',
            top: '-100%',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}>
            <input
              className="search-bar-input util-ellipsis"
              type="text"
              maxLength="50"
              placeholder="Search for products..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                padding: '10px',
                borderRadius: '30px',
                fontFamily: 'Inter, SF Pro Text, Roboto, Helvetica Neue, Helvetica, Tahoma, Arial, PingFang SC, Microsoft YaHei',
                fontSize: '16px',
              }}
            />
            <button className="fy23-icbu-search-bar-inner-button" style={{
              backgroundColor: '#EF5B2B',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '40px',
              width: '130px',
              cursor: 'pointer'
            }}>
              <i className="fa-solid fa-magnifying-glass"></i>
              <div style={{ paddingLeft: 10, display: 'inline-block' }}></div>
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>

      <Category />

      <div className="counter-section" style={{ padding: '80px 0', backgroundColor: '#f1f1f1' }}>
        <div className="container">
          <h2 style={{ fontSize: '3rem', fontWeight: '600', marginBottom: '40px', textAlign: 'center', color: '#333' }}>
            Discover Millions of Offerings
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '30px',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {Object.entries(counts).map(([key, value]) => (
              <div key={key} style={{
                textAlign: 'center',
                padding: '20px',
                backgroundColor: '#fff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                transition: 'transform 0.3s ease-in-out',
              }}>
                <div style={{
                  fontSize: '3.5rem',
                  fontWeight: '700',
                  color: '#EF5B2B',
                }}>
                  <CountUp end={value} duration={2} separator="," />
                  {key === 'products' || key === 'suppliers' ? 'M+' : key === 'countries' ? '+' : ''}
                </div>
                <p style={{
                  fontSize: '1.25rem',
                  fontWeight: '500',
                  color: '#666',
                  marginTop: '10px',
                }}>
                  {key === 'categories' ? 'Product Categories' :
                    key === 'countries' ? 'Countries and Regions' : key.charAt(0).toUpperCase() + key.slice(1)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="featured-products">
        <div className="container-fluid" style={{ paddingTop: "40px", width: "80%" }}>
          <div className="product-list" style={{ width: "100%" }}>
            {products.length > 0 ? (
              products.map(product => (
                <div className="product-card" key={product.id}>
                  <img src={product.imageUrl} alt={product.name} className="product-image" />
                  <div className="product-details">
                    <h3>{product.name}</h3>
                    <p>${product.price.toFixed(2)}</p>
                    <Link to={`/products/${product.id}`} className="btn btn-secondary view-details-btn" style={{ backgroundColor: '#EF5B2B' }}>
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 400px' , color: "#EF5B2B" }}>
                <h2>No Products Available</h2>
                <p>Sorry, we couldn't find any products. Please check back later!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <CallToAction />

      <div style={{ paddingLeft: "460px",paddingTop:"100px" }}>
        <ul>
          <a href='https://www.facebook.com' target='blank'><i className="fa-brands fa-facebook" style={{ fontSize: "40px", color: "black", paddingLeft: "90px" }}></i></a>
          <a href='https://www.instagram.com' target='blank'><i className="fa-brands fa-instagram" style={{ fontSize: "40px", color: "black", paddingLeft: "90px" }}></i></a>
          <i className="fa-brands fa-twitter" style={{ fontSize: "40px", color: "black", paddingLeft: "90px" }}></i>
          <i className="fa-brands fa-youtube" style={{ fontSize: "40px", color: "black", paddingLeft: "90px" }}></i>
          <i className="fa-brands fa-tiktok" style={{ fontSize: "40px", color: "black", paddingLeft: "90px" }}></i>
        </ul>
      </div>
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
}