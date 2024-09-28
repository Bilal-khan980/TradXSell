import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../Components/footer.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Category from './Category.js';
import hero from '../Components/Assets/hero.png';
import logo from '../Components/Assets/herologo.png';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            error: null
        };
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/products/approved/xx');
            console.log('Fetched products:', response.data);
            this.setState({ products: response.data });
        } catch (error) {
            console.error('Error fetching products:', error);
            this.setState({ error: 'Failed to fetch products' });
        }
    };

    render() {
        const { products, error } = this.state;

        if (error) {
            return <div>Error: {error}</div>;
        }

        return (
            <>
                {/* Hero Image with Centered Logo and Search Box */}
                <div
                    className="home-container"
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
                        flexDirection: "column", // Align items in a column
                        position: "relative",
                    }}
                >
                    {/* Logo */}
                    <img src={logo} style={{ position: 'relative', zIndex: '100', marginBottom: '20px' }} alt="Logo" />

                    {/* Centered Search Box */}
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
                            position : 'relative',
                            top : '-100%',
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
                <br />
                <section className="featured-products">
                    <div className="container-fluid" style={{ paddingTop: "40px", width: "80%" }}>
                        {/* <h2 style={{ color: "#EF5B2B", fontWeight: "bold", fontSize: "2rem", textAlign: "center", marginBottom: "40px" }}>
                            FEATURED PRODUCTS
                        </h2> */}
                        <div className="product-list" style={{ width: "100%" }}>
                            {products.map(product => (
                                <div className="product-card" key={product.id}>
                                    <img src={product.imageUrl} alt={product.name} className="product-image" />
                                    <div className="product-details">
                                        <h3>{product.name}</h3>
                                        <p>${product.price.toFixed(2)}</p>
                                        <Link to={`/products/${product.id}`} className="btn btn-secondary view-details-btn">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div style={{ paddingLeft: "360px" }}>
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
}

export default Home;
