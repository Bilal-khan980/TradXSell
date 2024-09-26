import React, { useState, useContext, useEffect, useCallback } from 'react';
import { AuthContext } from '../AuthContext.js';

function Reviews(props) {
    const { email, username } = useContext(AuthContext);

    const [review, setReview] = useState('');
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
    }

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
            review: review
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
        <div style={{ paddingLeft: "20px" }}>
            <div style={{ color: "yellow", fontWeight: "bold", fontSize: "30px" }}>REVIEWS</div>
            <form onSubmit={handleSubmit} >
                <input
                    placeholder='Leave a review.....'
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    style={{ color: "white", backgroundColor: "black", border: "none", borderBottom: "2px solid yellow" }}
                />
            </form>
            {loading && (
                <div className="alert alert-success mt-3" role="alert" style={{ width: "300px" }}>
                    {message}
                </div>
            )}

            <div style={{ paddingTop: "20px" }}>
                {reviews.map((rev, index) => (
                    <div key={index} style={{ color: "white" }}>

                        {rev.username} : {rev.review}

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Reviews;
