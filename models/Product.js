const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        minlength: [3, 'Product name must be at least 3 characters long'],
        maxlength: [50, 'Product name must be less than 50 characters long'],
        trim: true // Removes any extra spaces at the beginning or end
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Product price must be at least 0']
    },
    description: {
        type: String,
        maxlength: [500, 'Description must be less than 500 characters'],
        trim: true // Removes any extra spaces at the beginning or end
    },
    imageUrl: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    createdAt: {
        type: Date,
        default: Date.now, // Default to current date and time
    },
    updatedAt: {
        type: Date,
        default: Date.now // Default to current date and time
    }
});

// Middleware to update the updatedAt field before saving
productSchema.pre('save', function (next) {
    this.updatedAt = Date.now(); // Set updatedAt to current time whenever a document is saved
    next();
});

module.exports = mongoose.model('Product', productSchema);