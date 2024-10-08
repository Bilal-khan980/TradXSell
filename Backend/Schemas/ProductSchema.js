const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    latest: { type: Boolean, default: false },
    category: { type: String, required: true },
    featured: { type: Boolean, default: false },
    sizes: [String],
    colors: [String],
    quantity: { type: Number, required: true },
    sellerEmail: { type: String, required: true },
    status: { type: String, enum: ['approved', 'not approved', 'pending'], default: 'pending' },
    description: { type: String },
    type: { type: String, enum: ['local', 'international'], required: true },
    remarks: { type: String, default: '' }  // New remarks field with default empty string
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
