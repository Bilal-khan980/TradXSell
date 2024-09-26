const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    name: String,
    price: Number,
    imageUrl: String,
    latest: Boolean,
    category: String,
    featured: Boolean,
    sizes: [String],
    colors: [String],
    quantity: Number
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;