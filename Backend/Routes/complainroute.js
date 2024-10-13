const express = require('express');
const Complaint = require('../Schemas/complainschema.js'); // Path to your schema
const router = express.Router();

// Route to submit complaint
router.post('/submit', async (req, res) => {
    const { email, complaint } = req.body;

    if (!complaint || !email) {
        return res.status(400).json({ message: 'Email and complaint are required' });
    }

    try {
        const newComplaint = new Complaint({
            email: email,   // Use email from the frontend
            complaint: complaint
        });

        await newComplaint.save();
        res.status(201).json({ message: 'Complaint submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Route to get all complaints
router.get('/', async (req, res) => {
    try {
        const complaints = await Complaint.find({});
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


module.exports = router;
