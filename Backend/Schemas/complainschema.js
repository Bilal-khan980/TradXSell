const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    complaint: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Complaint', complaintSchema);
