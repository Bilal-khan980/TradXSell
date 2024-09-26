const express = require('express');
const CartItem = require('../Schemas/CartSchema.js');

const app = express.Router();

app.post('/add', async (req, res) => {
    const { email, username, productId, name, price, imageUrl, quantity } = req.body;

    try {
        // Check if the item already exists in the cart
        const existingItem = await CartItem.findOne({ email, productId });

        if (existingItem) {
            // If the item exists, update the quantity
            existingItem.quantity += quantity;
            await existingItem.save();
        } else {
            // If the item does not exist, create a new cart item
            const newItem = new CartItem({
                email,
                username,
                productId,
                name,
                price,
                imageUrl,
                quantity
            });

            await newItem.save();
        }

        return res.status(201).json({ success: true, message: 'Item added to cart' });
    } catch (err) {
        console.error('Error adding item to cart:', err);
        return res.status(500).json({ success: false, message: 'Failed to add item to cart' });
    }
});

app.get('/:email', async (req, res) => {
    const userEmail = req.params.email;

    try {
        const cartItems = await CartItem.find({ email: userEmail });
        return res.status(200).json(cartItems);
    } catch (err) {
        console.error('Error fetching cart items:', err);
        return res.status(500).json({ error: 'Failed to fetch cart items' });
    }
});

app.delete('/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const result = await CartItem.deleteMany({ email });
        res.json({ message: `Deleted ${result.deletedCount} cart items for user ${email}` });
    } catch (error) {
        console.error('Error deleting cart items:', error);
        res.status(500).json({ error: 'Failed to delete cart items' });
    }
});

module.exports = app;