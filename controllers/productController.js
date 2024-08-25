const mongoose = require('mongoose');
const Product = require('../models/Product');

exports.listProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            data: products,
            totalProducts: products.length
        });
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            // Extract and format validation errors
            const errors = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ errors });
        } else {
            res.status(500).json({ error: 'An error occurred while creating the product.' });
        }
    }
};

exports.createProduct = async (req, res) => {
    const { name, price, description } = req.body;
    const imageUrl = req.file ? req.file.path : undefined; // Handle image upload if present

    try {
        const product = new Product({ name, price, description, imageUrl });
        await product.save();
        res.status(200).json({
            message: 'Product created successfully',
            data: product,
        });
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            // Extract and format validation errors
            const errors = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ errors });
        } else {
            res.status(500).json({ error: 'An error occurred while creating the product.' });
        }
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
    const imageUrl = req.file ? req.file.path : undefined; // Handle image upload if present

    try {
        const product = await Product.findByIdAndUpdate(
            id,
            { name, price, description, imageUrl },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        res.status(200).json({
            message: 'Product updated successfully',
            data: product,
        });
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            res.status(400).json({ error: 'Invalid product ID.' });
        } else {
            if (error instanceof mongoose.Error.ValidationError) {
                // Extract and format validation errors
                const errors = Object.values(error.errors).map(err => err.message);
                res.status(400).json({ errors });
            } else {
                res.status(500).json({ error: 'An error occurred while creating the product.' });
            }
        }
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            res.status(400).json({ error: 'Invalid product ID.' });
        } else {
            if (error instanceof mongoose.Error.ValidationError) {
                // Extract and format validation errors
                const errors = Object.values(error.errors).map(err => err.message);
                res.status(400).json({ errors });
            } else {
                res.status(500).json({ error: 'An error occurred while creating the product.' });
            }
        }
    }
};