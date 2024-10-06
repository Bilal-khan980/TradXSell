const express = require('express');
const router = express.Router();
const Product = require('../Schemas/ProductSchema');
const Order = require('../Schemas/OrderSchema');
const Review = require('../Schemas/ReviewsSchema');

// Fetch total number of products by a seller
router.get('/total-products/:sellerEmail', async (req, res) => {
  try {
    const count = await Product.countDocuments({ sellerEmail: req.params.sellerEmail });
    res.status(200).json({ totalProducts: count });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product count for the seller' });
  }
});

// Fetch total number of orders related to the seller's products
router.get('/total-orders/:sellerEmail', async (req, res) => {
  try {
    const products = await Product.find({ sellerEmail: req.params.sellerEmail });
    const productIds = products.map(product => product.id);
    
    const count = await Order.countDocuments({ items: { $elemMatch: { productId: { $in: productIds } } } });
    res.status(200).json({ totalOrders: count });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching order count for the seller' });
  }
});

// Fetch total number of reviews for the seller's products
router.get('/total-reviews/:sellerEmail', async (req, res) => {
  try {
    const products = await Product.find({ sellerEmail: req.params.sellerEmail });
    const productIds = products.map(product => product.id);
    
    const count = await Review.countDocuments({ productId: { $in: productIds } });
    res.status(200).json({ totalReviews: count });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching review count for the seller' });
  }
});



module.exports = router;
