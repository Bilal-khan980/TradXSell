const express = require('express');
const Order = require('../Schemas/OrderSchema.js');
const router = express.Router();

// POST /api/orders/add - Create a new order
router.post('/add', async (req, res) => {
    try {
        const { email, username, items } = req.body;

        // Create a new order instance
        const newOrder = new Order({
            email,
            username,
            items,
            status: 'Pending'
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();

        res.status(201).json(savedOrder);
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ error: 'Failed to save order' });
    }
});

// GET /api/orders/:email - Get orders by email
router.get('/:email', async (req, res) => {
    try {
        const orders = await Order.find({ email: req.params.email });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// GET /api/orders - Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// PUT /api/orders/:id/shipped - Update entire order status to Shipped
router.put('/:id/shipped', async (req, res) => {
    try {
        const orderId = req.params.id;

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId, 
            { 
                status: 'Shipped', 
                'items.$[].status': 'Shipped'  // Update all items' status
            }, 
            { new: true }
        );

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Failed to update order status' });
    }
});

// PUT /api/orders/:id/delivered - Update entire order status to Delivered
router.put('/:id/delivered', async (req, res) => {
    try {
        const orderId = req.params.id;

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId, 
            { 
                status: 'Delivered', 
                'items.$[].status': 'Delivered'  // Update all items' status
            }, 
            { new: true }
        );

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'Failed to update order status' });
    }
});

// PUT /api/orders/:orderId/items/:productId/status - Update the status of an item in an order
router.put('/:orderId/items/:productId/status', async (req, res) => {
    const { orderId, productId } = req.params;
    const { status } = req.body;  // Expects a status field in the request body

    try {
        const updatedOrder = await Order.findOneAndUpdate(
            { _id: orderId, "items.productId": productId },  // Find order and specific item
            { $set: { "items.$.status": status } },  // Update item status
            { new: true }
        );
        
        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order or item not found' });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error updating item status:', error);
        res.status(500).json({ error: 'Failed to update item status' });
    }
});



  
module.exports = router;
