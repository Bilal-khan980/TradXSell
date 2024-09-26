
const mongoose = require('mongoose');
const cartItemSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    productId: { type: Number, required: true },
    name: String,
    price: Number,
    imageUrl: String,
    quantity: { type: Number, default: 1 }
});

const CartItem = mongoose.model('CartItem', cartItemSchema);
module.exports = CartItem;