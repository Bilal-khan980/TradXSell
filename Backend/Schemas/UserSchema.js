const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    address: String,
    phoneNumber: String
});

// Create a Mongoose model
const User = mongoose.model('User', userSchema);
module.exports = User;