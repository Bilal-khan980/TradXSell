const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('../Backend/Routes/ProductRoutes.js');
const userRoutes = require('../Backend/Routes/UserRoutes.js');
const cartRoutes = require('../Backend/Routes/CartRoutes.js');
const Reviewroutes = require('../Backend/Routes/ReviewRoutes.js');
const orderroutes = require('../Backend/Routes/OrderRoutes.js');


const app = express();
app.use('/uploads/images', express.static('uploads/images'));

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));



app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/cart', cartRoutes);
app.use('/review', Reviewroutes);
app.use('/orders', orderroutes);



mongoose.connect('mongodb+srv://Bilalkhan:Pakistan@cluster1.moct8fi.mongodb.net/Wardrobrix', {
})
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });




// ---------------------------------------------------------------------------------------------------------------

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
