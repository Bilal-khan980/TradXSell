const mongoose = require('mongoose');
const cartItemSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    productId: { type: Number, required: true },
    name: String,
    price: Number,
    imageUrl: String,
    quantity: { type: Number, default: 1 },
    size: { type: String, default: "" },  // New field for size
    color: { type: String, default: "" }  // New field for color
});

const CartItem = mongoose.model('CartItem', cartItemSchema);
module.exports = CartItem;
