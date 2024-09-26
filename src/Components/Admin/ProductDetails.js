import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
        return <div style={{ color: 'white', textAlign: 'center', paddingTop: '20px' }}>Error: {error}</div>;
    }

    if (!product) {
        return <div style={{ color: 'white', textAlign: 'center', paddingTop: '20px' }}>Loading product details...</div>;
    }

    return (
        <div className="container-fluid bg-black text-light py-4" style={{ height: "100vh" }}>
            <div className="container">
                <h2 className="text-center font-weight-bold mb-4" style={{ color: "yellow" }}>PRODUCT DETAILS</h2>
                <div className="card" style={{ backgroundColor: 'black', border: '4px solid white', borderRadius: '10px', width: "800px" }}>
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img src={product.imageUrl} className="card-img" alt={product.name} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title font-weight-bold" style={{ color: "yellow" }}>{product.name}</h5>
                                <p className="card-text" style={{ color: "white" }}>Price: ${product.price}</p>
                                <p className="card-text" style={{ color: "white" }}>Category: {product.category}</p>
                                <p className="card-text" style={{ color: "white" }}>Sizes: {product.sizes.join(', ')}</p>
                                <p className="card-text" style={{ color: "white" }}>Colors: {product.colors.join(', ')}</p>
                                <p className="card-text" style={{ color: "white" }}>Quantity: {product.quantity}</p>
                                <p className="card-text" style={{ color: "white" }}>Latest: {product.latest ? 'Yes' : 'No'}</p>
                                <p className="card-text" style={{ color: "white" }}>Featured: {product.featured ? 'Yes' : 'No'}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <h4 style={{ color: "yellow" }}>Reviews</h4>
                    {reviews.length > 0 ? (
                        <ul>
                            {reviews.map((review) => (
                                <li key={review._id} style={{ color: "white" }}>
                                    <p><strong>{review.username} ({review.userEmail})</strong></p>
                                    <p>{review.review}</p>
                                    <p><small>{new Date(review.createdAt).toLocaleString()}</small></p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p style={{ color: "white" }}>No reviews yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
