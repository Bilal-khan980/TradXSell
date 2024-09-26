const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    productId: {
        type: Number,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);
