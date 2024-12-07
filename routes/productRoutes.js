// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rutas de productos

router.get('/store/:id_tienda', productController.getProductsByStore);

module.exports = router;
