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
    const [quantity, setQuantity] = useState(1);
    const { email, username } = useContext(AuthContext);
    const [averageRating, setAverageRating] = useState(0);
    const [reviewCount, setReviewCount] = useState(0);
    
    const [selectedColor, setSelectedColor] = useState('');  // New state for selected color
    const [selectedSize, setSelectedSize] = useState('');    // New state for selected size

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/products/${id}`);
                setProduct(response.data);
                setCheckinstock(response.data.quantity > 0);

                const reviews = response.data.reviews || [];
                const totalReviews = reviews.length;
                setReviewCount(totalReviews);

                if (totalReviews > 0) {
                    const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
                    setAverageRating((totalRatings / totalReviews).toFixed(1));
                } else {
                    setAverageRating(0);
                }
            } catch (error) {
                setError('Failed to fetch product');
            }
        };

        fetchProduct();
    }, [id]);

    const addToCart = async () => {
        try {
            const response = await axios.post('/cart/add', {
                email,
                username,
                productId: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                quantity,
                size: selectedSize || "",  // Send selected size or empty string
                color: selectedColor || ""  // Send selected color or empty string
            });

            if (response.data.success) {
                alert('Item added to cart');
            } else {
                alert('Failed to add item to cart');
            }
        } catch (error) {
            alert('Failed to add item to cart');
        }
    };

    const handleQuantityChange = (e) => {
        setQuantity(Math.max(1, e.target.value));
    };

    if (error) return <div>Error: {error}</div>;
    if (!product) return <div>Loading...</div>;

    return (
        <div className="home-container" style={{ backgroundColor: "white", padding: "20px" }}>
            <div className="container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", maxWidth: "1200px", margin: "0 auto" }}>
                <div className="product-images" style={{ flex: "1 1 50%", maxWidth: "600px" }}>
                    <img src={product.imageUrl} alt={product.name} style={{ width: "100%", borderRadius: "8px" }} />
                </div>
                <div className="product-details" style={{ flex: "1 1 40%", maxWidth: "500px" }}>
                    <h1 style={{ color: "#000", fontSize: "24px", marginBottom: "10px" }}>{product.name}</h1>
                    <p style={{ color: "#EF5B2B", fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
                        ${product.price.toFixed(2)}
                    </p>

                    {/* Dropdown for Color */}
                    <div style={{ marginBottom: "20px" }}>
                        <p style={{ color: "#000", marginBottom: "10px" }}>Color:</p>
                        <select
                            style={{ padding: "10px", width: "100%", border: "1px solid #ccc", borderRadius: "4px" }}
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                        >
                            <option value="">Select Color</option>
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
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                        >
                            <option value="">Select Size</option>
                            {product.sizes && product.sizes.map((size, index) => (
                                <option key={index} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                        <input
                            type="number"
                            value={quantity}
                            min="1"
                            onChange={handleQuantityChange}
                            style={{ padding: "10px", width: "60px", marginRight: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                        />
                        <button onClick={addToCart} style={{ padding: "12px 20px", backgroundColor: "#EF5B2B", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}>
                            Add to cart
                        </button>
                    </div>
                    <p style={{ color: checkinstock ? "green" : "red", fontWeight: "bold" }}>
                        {checkinstock ? "In Stock" : "Out of Stock"}
                    </p>
                </div>
            </div>
            <Reviews id={product.id} averageRating={averageRating} reviewCount={reviewCount} />
            <Footer />
        </div>
    );
}
export default Details;
