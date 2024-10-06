import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SideNavbar from './SideNavbar'; // Import the SideNavbar component

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState('');

    const fetchReviews = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:5000/review/getreviews?productId=${id}`);
            const data = await response.json();
            console.log(data);
            setReviews(data);
        } catch (error) {
            console.log(error);
        }
    }, [id]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setError('Failed to fetch product details');
            }
        };

        fetchProductDetails();
    }, [id]);

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center', paddingTop: '20px' }}>Error: {error}</div>;
    }

    if (!product) {
        return <div style={{ color: 'black', textAlign: 'center', paddingTop: '20px' }}>Loading product details...</div>;
    }

    return (
        <div className="bg-light text-dark" style={{ minHeight: "100vh", display: "flex" }}>
            <SideNavbar /> {/* Include the SideNavbar component */}
            <div className="flex-grow-1 d-flex flex-column align-items-center">
                <h2 className="font-weight-bold mb-4" style={{ color: "#EF5B2B" }}>PRODUCT DETAILS</h2>
                <div className="card" style={{ backgroundColor: 'white', border: '1px solid #EF5B2B', borderRadius: '10px', width: "800px" }}>
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img src={product.imageUrl} className="card-img" alt={product.name} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title font-weight-bold" style={{ color: "#EF5B2B" }}>{product.name}</h5>
                                <p className="card-text" style={{ color: "black" }}>Price: ${product.price}</p>
                                <p className="card-text" style={{ color: "black" }}>Category: {product.category}</p>
                                <p className="card-text" style={{ color: "black" }}>Sizes: {product.sizes.join(', ')}</p>
                                <p className="card-text" style={{ color: "black" }}>Colors: {product.colors.join(', ')}</p>
                                <p className="card-text" style={{ color: "black" }}>Quantity: {product.quantity}</p>
                                <p className="card-text" style={{ color: "black" }}>Latest: {product.latest ? 'Yes' : 'No'}</p>
                                <p className="card-text" style={{ color: "black" }}>Featured: {product.featured ? 'Yes' : 'No'}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <h4 style={{ color: "#EF5B2B" }}>Reviews</h4>
                    {reviews.length > 0 ? (
                        <ul>
                            {reviews.map((review) => (
                                <li key={review._id} style={{ color: "black" }}>
                                    <p><strong>{review.username} ({review.userEmail})</strong></p>
                                    <p>{review.review}</p>
                                    <p><small>{new Date(review.createdAt).toLocaleString()}</small></p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p style={{ color: "black" }}>No reviews yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
