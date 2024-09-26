import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Footer from '../Components/footer.js';
import { AuthContext } from '../AuthContext.js'; // Adjust the path according to your file structure
import Reviews from './Reviews.js';

function Details() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState('');
    const [checkinstock, setCheckinstock] = useState(false);
    const { email, username } = useContext(AuthContext); // Assuming the user's email is stored in userName

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
                quantity: 1 // Or the selected quantity
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

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="home-container" style={{ backgroundColor: "black", paddingBottom: "30px" }}>
                <div className="container" style={{ paddingTop: "60px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                    <div className="product-card" key={product.id} style={{ backgroundColor: "black", padding: "20px", maxWidth: "600px" }}>
                        <img src={product.imageUrl} alt={product.name} style={{ width: "100%", borderRadius: "20px", backgroundColor: "black" }} />
                    </div>
                    <div style={{ padding: "20px", maxWidth: "600px", color: "white" }}>
                        <Link to="/productspage" style={{ color: "yellow" }}>
                            <i className="fa-solid fa-arrow-left" style={{ color: "yellow", fontSize: "40px" }}></i>
                        </Link>
                        <h1 style={{ color: "yellow", textAlign: "center", fontWeight: "bold", paddingTop: "10px" }}>{product.name}</h1>
                        <p style={{ color: "white", textAlign: "center" }}>{product._id}</p>
                        <p style={{ color: "white", fontSize: "25px", textAlign: "center" }}>({product.category})</p>
                        <p style={{ color: "yellow", fontSize: "30px", textAlign: "center" }}>{product.price}</p>
                        <div style={{ paddingTop: "150px" }}>

                        </div>
                        <hr style={{ borderColor: "white" }} />
                        {/* <p style={{ color: "white", fontSize: "25px", textAlign: "center" }}>COLORS</p> */}
                        {/* <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                            {product.colors.map((color, index) => (
                                <div key={index} style={{ width: "50px", height: "50px", backgroundColor: color, borderRadius: "50%", border: "4px solid white" }}></div>
                            ))}
                        </div>
                        <br />
                        <br />
                        <p style={{ color: "white", fontSize: "25px", textAlign: "center" }}>SIZE</p>
                        <div style={{ display: "flex", justifyContent: "center", gap: "20px", fontSize: "20px" }}>
                            {product.sizes.map((size, index) => (
                                <div key={index} style={{ border: "1px solid white", borderRadius: "50%", width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>{size}</div>
                            ))}
                        </div> */}
                        <div style={{ paddingtop: "200px", width: "100%", display: "flex", justifyContent: "center" }}>
                            {checkinstock ? (
                                <p style={{ color: "white", fontSize: "25px", textAlign: "center" }}>In Stock</p>
                            ) : (
                                <p style={{ color: "red", fontSize: "25px", textAlign: "center" }}>Out of Stock</p>
                            )}
                        </div>
                        <div style={{ paddingTop: "20px", width: "100%", display: "flex", justifyContent: "center" }}>
                            <button
                                onClick={addToCart}
                                style={{
                                    width: "200px",
                                    height: "50px",
                                    backgroundColor: checkinstock ? "yellow" : "grey",
                                    color: "black",
                                    fontWeight: "bold",
                                    border: "none",
                                    borderRadius: "10px",
                                    cursor: checkinstock ? "pointer" : "not-allowed"
                                }}
                                disabled={!checkinstock}
                            >
                                ADD TO CART
                            </button>
                        </div>
                    </div>
                </div>
                <Reviews id={product.id}></Reviews>
                <Footer />
            </div>
        </>
    );
}

export default Details;
