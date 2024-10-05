const express = require('express');
const User = require('../Schemas/UserSchema.js');

const app = express.Router();

// Add new user
app.post('/addnew', async (req, res) => {
    const { username, email, password, address, phoneNumber, role } = req.body;

    try {
        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Create a new user object
        const newUser = new User({
            username,
            email,
            password,
            address,
            phoneNumber, role
        });

        // Save the user object to the database
        await newUser.save();
        console.log('User saved to database');
        return res.status(201).json({ message: 'User added successfully' });
    } catch (err) {
        console.error('Error saving user:', err);
        return res.status(500).json({ error: 'Failed to add user' });
    }
});


// Login user
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Compare the password with the stored password in plain text
        if (user.password !== password) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Login successful
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            user: { email: user.email, username: user.username, role: user.role, id: user._id }
        });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});


app.get('/userdetails/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ _id: id });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const { username, email, address, phoneNumber } = req.body;

    try {
        // Find the user by ID and update their details
        const updatedUser = await User.findByIdAndUpdate(id, {
            username,
            email,
            address,
            phoneNumber
        }, { new: true }); // { new: true } ensures you get the updated document back

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Respond with the updated user object
        res.status(200).json({ user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
app.get('/total', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();

        res.status(200).json(totalUsers);
    } catch (error) {
        console.error('Error fetching total users:', error);
        res.status(500).json({ error: 'Failed to fetch total users' });
    }
});

app.get('/admins', async (req, res) => {
    try {
        const admins = await User.find({ role: { $in: ['seller', 'user'] } });

      res.status(200).json(admins);
    } catch (error) {
      console.error('Error fetching admins:', error);
      res.status(500).json({ error: 'Failed to fetch admins' });
    }
});




  app.delete('/admins/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});


  
module.exports = app;
