const express = require('express');
const router = express.Router();
const Product = require('../Schemas/ProductSchema');
const Order = require('../Schemas/OrderSchema');
const Review = require('../Schemas/ReviewsSchema');


router.get('/recent-reviews/:sellerEmail', async (req, res) => {
  try {
    const products = await Product.find({ sellerEmail: req.params.sellerEmail });
    const productIds = products.map(product => product.id);
    
    // Fetch recent reviews, limit to the latest 5
    const reviews = await Review.find({ productId: { $in: productIds } })
      .sort({ createdAt: -1 }) // Sort by created date in descending order
      .limit(5); // Limit to the latest 5 reviews

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching recent reviews for the seller' });
    }
  });

// Fetch total number of products by a seller
router.get('/total-products/:sellerEmail', async (req, res) => {
  try {
    const count = await Product.countDocuments({ sellerEmail: req.params.sellerEmail });
    res.status(200).json({ totalProducts: count });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Error fetching product count for the seller' });
  }
});

// Fetch total number of orders related to the seller's products
router.get('/total-orders/:sellerEmail', async (req, res) => {
  try {
    const products = await Product.find({ sellerEmail: req.params.sellerEmail });
    const productIds = products.map(product => product.id); // Use _id for consistency
    
    const count = await Order.countDocuments({ items: { $elemMatch: { productId: { $in: productIds } } } });
    res.status(200).json({ totalOrders: count });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Error fetching order count for the seller' });
  }
});

// Fetch total number of reviews for the seller's products
router.get('/total-reviews/:sellerEmail', async (req, res) => {
  try {
    const products = await Product.find({ sellerEmail: req.params.sellerEmail });
    const productIds = products.map(product => product.id); // Use _id for consistency
    
    const count = await Review.countDocuments({ productId: { $in: productIds } });
    res.status(200).json({ totalReviews: count });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Error fetching review count for the seller' });
  }
});

// Fetch daily orders for the current month
router.get('/daily-orders/:sellerEmail', async (req, res) => {
  try {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1); // First day of the current month
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59); // Last day of the current month

    // Modify to filter orders by products of the seller
    const products = await Product.find({ sellerEmail: req.params.sellerEmail });
    const productIds = products.map(product => product.id); // Use _id for consistency

    const orders = await Order.find({
      'items.productId': { $in: productIds },
      orderDate: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    });

    // Initialize an array for each day of the month (1-indexed for days)
    const dailyOrderCount = Array.from({ length: 31 }, () => 0); // Default to 0 for 31 days

    // Count orders for each day
    orders.forEach(order => {
      const day = order.orderDate.getDate(); // Get the day of the order date
      if (day >= 1 && day <= 31) {
        dailyOrderCount[day - 1]++; // Increment count for the respective day
      }
    });

    // Return daily order counts
    res.status(200).json(dailyOrderCount);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Error fetching daily order counts' });
  }
});

module.exports = router;
