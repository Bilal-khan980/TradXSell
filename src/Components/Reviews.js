import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext.js';

function Reviews(props) {
    const { email, username } = useContext(AuthContext);

    const [review, setReview] = useState('');
    const [rating, setRating] = useState(1); // State for star rating
    const [message, setMessage] = useState('');
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchReviews = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:5000/review/getreviews?productId=${props.id}`);
            const data = await response.json();
            console.log(data);
            setReviews(data);
        } catch (error) {
            console.log(error);
        }
    }, [props.id]);

    const removemessage = () => {
        setTimeout(() => {
            setMessage('');
            setLoading(false);
        }, 3000);
    };

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!review) {
            setMessage("Review cannot be empty.");
            return;
        }

        const reviewData = {
            userEmail: email,
            username: username,
            review: review,
            rating: rating // Include rating in the data
        };

        try {
            const response = await fetch(`http://localhost:5000/review/addnew/${props.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData),
                credentials: 'include'
            });

            if (response.ok) {
                await response.json();
                setLoading(true);
                setMessage("Thanks for leaving a review.");
                setReview('');
                setRating(1); // Reset rating to default
                removemessage();
                fetchReviews(); // Refresh reviews after submitting
            } else {
                const errorData = await response.json();
                setMessage(`Review not saved. Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error adding review:', error);
            setMessage("Review not saved due to a network error.");
        }
    };

    return (
        <div style={{ padding: "20px", backgroundColor: "white", color: "#EF5B2B" }}>
            <div style={{ fontWeight: "bold", fontSize: "30px", marginBottom: "20px" }}>REVIEWS</div>
            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                <div>
                    <input
                        type="text"
                        placeholder='Leave a review...'
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        style={{ color: "black", backgroundColor: "lightgrey", border: "none", borderBottom: "2px solid #EF5B2B", width: "300px", padding: "10px" }}
                    />
                </div>
                <div style={{ marginTop: "10px" }}>
                    <label style={{ marginRight: "10px" }}>Rating:</label>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            style={{ cursor: 'pointer', color: star <= rating ? '#EF5B2B' : 'lightgrey' }}
                            onClick={() => setRating(star)}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <button type="submit" style={{ marginTop: "10px", backgroundColor: "#EF5B2B", color: "white", border: "none", padding: "10px 20px", cursor: "pointer" }}>
                    Submit Review
                </button>
            </form>
            {loading && (
                <div className="alert alert-success mt-3" role="alert" style={{ width: "300px" }}>
                    {message}
                </div>
            )}
            <div style={{ paddingTop: "20px" }}>
                {reviews.length > 0 ? (
                    reviews.map((rev, index) => (
                        <div key={index} style={{ marginBottom: "15px", border: "1px solid #EF5B2B", padding: "10px", borderRadius: "5px" }}>
                            <strong>{rev.username}</strong>: {rev.review}
                            <div>
                                {/* Render the stars based on the rating */}
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} style={{ color: star <= rev.rating ? '#EF5B2B' : 'lightgrey' }}>★</span>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No reviews available for this product.</div>
                )}
            </div>
        </div>
    );
}

export default Reviews;
