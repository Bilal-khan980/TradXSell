    const express = require('express');
    const Product = require('../Schemas/ProductSchema.js');
    const path = require('path');


    const router = express.Router();

    const multer = require('multer');

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/images'); // Directory to store images
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        }
    });

    const upload = multer({ storage });


    router.post('/', upload.single('image'), async (req, res) => {
        const { id, name, price, latest, category, featured, sizes, colors, quantity, description } = req.body;
        const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : null;
        const sellerEmail = req.body.sellerEmail; // Get the seller's email from the request

        try {
            const existingProduct = await Product.findOne({ id });

            if (existingProduct) {
                return res.status(400).json({ error: 'Product with this id already exists' });
            }

            // Remove spaces from category
            const sanitizedCategory = category.toLowerCase().replace(/\s+/g, '');


            const newProduct = new Product({
                id,
                name,
                price,
                imageUrl,
                latest,
                category: sanitizedCategory, // Use the sanitized category
                featured,
                sizes: sizes.split(','),
                colors: colors.split(','),
                quantity,
                sellerEmail,
                description // Include the description in the product creation
            });

            await newProduct.save();
            return res.status(201).json(newProduct);
        } catch (error) {
            return res.status(500).json({ error: 'Error saving product' });
        }
    });


    router.use('/uploads/images', express.static(path.join(__dirname, '../uploads/images')));



    router.get('/seller/:email', async (req, res) => {
        try {
            const { email } = req.params; // Get email from route parameters
            const products = await Product.find({ sellerEmail: email }); // Find products by seller email
            console.log('Products found:', products); // Log products found
            res.json(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ message: 'Failed to fetch products' });
        }
    });

    router.get('/latest', async (req, res) => {
        try {
            const latestProducts = await Product.find({ latest: true });
            res.status(200).json(latestProducts);
        } catch (err) {
            console.error('Error fetching latest products:', err);
            res.status(500).json({ error: 'Failed to fetch latest products' });
        }
    });

    router.get('/featured', async (req, res) => {
        try {
            const featuredProducts = await Product.find({ featured: true });
            res.status(200).json(featuredProducts);
        } catch (err) {
            console.error('Error fetching featured products:', err);
            res.status(500).json({ error: 'Failed to fetch featured products' });
        }
    });

    router.get('/mens', async (req, res) => {
        try {
            const mensProducts = await Product.find({ category: "Mens" });
            res.status(200).json(mensProducts);
        } catch (err) {
            console.error('Error fetching mens products:', err);
            res.status(500).json({ error: 'Failed to fetch mens products' });
        }
    });

    router.get('/womens', async (req, res) => {
        try {
            const womensProducts = await Product.find({ category: "Womens" });
            res.status(200).json(womensProducts);
        } catch (err) {
            console.error('Error fetching womens products:', err);
            res.status(500).json({ error: 'Failed to fetch womens products' });
        }
    });

    router.get('/:id', async (req, res) => {
        try {
            const productId = req.params.id;
            const product = await Product.findOne({ id: productId });

            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            res.status(200).json(product);
        } catch (err) {
            console.error('Error fetching product by ID:', err);
            res.status(500).json({ error: 'Failed to fetch product' });
        }
    });

    router.get('/all/x', async (req, res) => {
        try {
            const allProducts = await Product.find();

            res.status(200).json(allProducts);
        } catch (err) {
            console.error('Error fetching products:', err);
            res.status(500).json({ error: 'Failed to fetch products' });
        }
    });

    router.delete('/:id', async (req, res) => {
        const productId = req.params.id;

        try {
            const deletedProduct = await Product.findOneAndDelete({ id: productId });

            if (!deletedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }

            console.log('Product deleted:', deletedProduct);
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (err) {
            console.error('Error deleting product:', err);
            res.status(500).json({ error: 'Failed to delete product' });
        }
    });

    router.get('/trending', async (req, res) => {
        try {
            // Logic to determine trending items, e.g., based on most viewed or added to cart
            const trendingItems = await Product.find({ /* criteria for trending items */ });

            res.status(200).json(trendingItems);
        } catch (err) {
            console.error('Error fetching trending items:', err);
            res.status(500).json({ error: 'Failed to fetch trending items' });
        }
    });

    router.get('/most-sold', async (req, res) => {
        try {
            const mostSoldItems = await Product.find().sort({ sold: -1 }).limit(10);

            res.status(200).json(mostSoldItems);
        } catch (err) {
            console.error('Error fetching most sold items:', err);
            res.status(500).json({ error: 'Failed to fetch most sold items' });
        }
    });

    router.patch('/updatestatus/:id', async (req, res) => {
        try {
        const { status } = req.body; // Expecting the new status from the frontend
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { status: status }, { new: true });
        
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
    
        res.status(200).json(updatedProduct);
        } catch (error) {
        res.status(400).json({ message: error.message });
        }
    });



    router.get('/approved/xx', async (req, res) => {
        try {
            // Query the database for products with status 'approved'
            const approvedProducts = await Product.find({ status: 'approved' });
            
            if (approvedProducts.length === 0) {
                return res.status(404).json({ message: 'No approved products found' });
            }

            // Respond with the approved products
            res.status(200).json(approvedProducts);
        } catch (err) {
            console.error('Error fetching approved products:', err);
            res.status(500).json({ error: 'Failed to fetch approved products' });
        }
    });

    router.get('/category/:categoryName', async (req, res) => {
        const categoryName = req.params.categoryName.toLowerCase(); // Convert to lowercase
        try {
            const products = await Product.find({ category: categoryName });
            if (products.length === 0) {
                return res.status(404).json({ message: 'No products found in this category.' });
            }
            res.status(200).json(products);
        } catch (err) {
            console.error('Error fetching products by category:', err);
            res.status(500).json({ error: 'Failed to fetch products' });
        }
    });



    module.exports = router;
