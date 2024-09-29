import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../AuthContext.js';
import Footer from '../Components/footer.js';
import Reviews from './Reviews.js';

function Details() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState('');
    const [checkinstock, setCheckinstock] = useState(false);
    const [quantity, setQuantity] = useState(1); // State to manage quantity
    const { email, username } = useContext(AuthContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/products/${id}`);
                console.log('Fetched product:', response.data);
                setProduct(response.data);
                setCheckinstock(response.data.quantity > 0);
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Failed to fetch product');
            }
        };

        fetchProduct();
    }, [id]);

    const addToCart = async () => {
        try {
            const response = await axios.post('/cart/add', {
                email: email,
                username: username,
                productId: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                quantity: quantity // Use the state variable for quantity
            });

            if (response.data.success) {
                alert('Item added to cart');
            } else {
                alert('Failed to add item to cart');
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
            alert('Failed to add item to cart');
        }
    };

    const handleQuantityChange = (e) => {
        const value = Math.max(1, e.target.value); // Ensure quantity is at least 1
        setQuantity(value);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="home-container" style={{ backgroundColor: "white", padding: "20px" }}>
            <div className="container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", maxWidth: "1200px", margin: "0 auto" }}>
                <div className="product-images" style={{ flex: "1 1 50%", maxWidth: "600px" }}>
                    <img src={product.imageUrl} alt={product.name} style={{ width: "100%", borderRadius: "8px" }} />
                    <div style={{ display: "flex", justifyContent: "start", marginTop: "20px" }}>
                        {[1, 2, 3, 4].map((_, index) => (
                            <img key={index} src={product.imageUrl} alt={`${product.name} thumbnail`} style={{ width: "60px", height: "60px", marginRight: "10px", borderRadius: "4px" }} />
                        ))}
                    </div>
                </div>
                <div className="product-details" style={{ flex: "1 1 40%", maxWidth: "500px" }}>
                    <h1 style={{ color: "#000", fontSize: "24px", marginBottom: "10px" }}>{product.name}</h1>
                   
                    <p style={{ color: "#EF5B2B", fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>${product.price.toFixed(2)} <span style={{ textDecoration: "line-through", color: "#666", fontSize: "18px", marginLeft: "10px" }}>${(product.price * 1.2).toFixed(2)}</span></p>
                    <p style={{ color: "#666", marginBottom: "20px" }}>{product.description}</p>
                    
                    {/* Dropdown for Color */}
                    <div style={{ marginBottom: "20px" }}>
                        <p style={{ color: "#000", marginBottom: "10px" }}>Color:</p>
                        <select
                            style={{ padding: "10px", width: "100%", border: "1px solid #ccc", borderRadius: "4px" }}
                        >
                            {product.colors && product.colors.map((color, index) => (
                                <option key={index} value={color}>{color}</option>
                            ))}
                        </select>
                    </div>
                    
                    {/* Dropdown for Size */}
                    <div style={{ marginBottom: "20px" }}>
                        <p style={{ color: "#000", marginBottom: "10px" }}>Size:</p>
                        <select
                            style={{ padding: "10px", width: "100%", border: "1px solid #ccc", borderRadius: "4px" }}
                        >
                            {product.sizes && product.sizes.map((size, index) => (
                                <option key={index} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                        <input
                            type="number"
                            value={quantity} // Controlled input
                            min="1"
                            onChange={handleQuantityChange} // Update quantity state on change
                            style={{ padding: "10px", width: "60px", marginRight: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                        />
                        <button
                            onClick={addToCart}
                            style={{
                                padding: "12px 20px",
                                backgroundColor: "#EF5B2B",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "16px"
                            }}
                        >
                            Add to cart
                        </button>
                    </div>
                    <p style={{ color: checkinstock ? "green" : "red", fontWeight: "bold" }}>
                        {checkinstock ? "In Stock" : "Out of Stock"}
                    </p>
                </div>
            </div>
            <Reviews id={product.id} />
            <Footer />
        </div>
    );
}

export default Details;
