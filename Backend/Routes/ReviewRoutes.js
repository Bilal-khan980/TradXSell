const express = require('express');
const router = express.Router();
const Review = require('../Schemas/ReviewsSchema.js');

// Add a new review
// Add a new review
router.post('/addnew/:id', async (req, res) => {
  try {
    const review = new Review({
      productId: req.params.id,
      username: req.body.username,
      userEmail: req.body.userEmail,
      review: req.body.review,
      rating: req.body.rating // Include rating here
    });
    await review.save();
    res.status(201).json({ success: true, review });
  } catch (err) {
    console.error('Error saving review:', err);
    res.status(400).json({ success: false, message: err.message });
  }
});



router.get('/getreviews', async (req, res) => {
  try {
    const { productId } = req.query;
    const userReviews = await Review.find({ productId: productId });
    res.status(200).json(userReviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = router;