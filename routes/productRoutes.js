const express = require('express');
const multer = require('multer');
const productController = require('../controllers/productController');

const router = express.Router();

// Configure Multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5 MB file size limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Only JPEG, JPG and PNG files are allowed'), false);
        }
    }
});


router.get('/products', productController.listProducts);
router.post('/product', (req, res, next) => {
    upload.single('image')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // Multer-specific errors
            return res.status(400).json({ error: err.message });
        } else if (err) {
            // General errors, including file type validation errors
            return res.status(400).json({ error: err.message });
        }
        next();
    });
}, productController.createProduct);
router.put('/product/:id', (req, res, next) => {
    upload.single('image')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: err.message });
        } else if (err) {
            return res.status(400).json({ error: err.message });
        }
        next();
    });
}, productController.updateProduct);
router.delete('/product/:id', productController.deleteProduct);

module.exports = router;
