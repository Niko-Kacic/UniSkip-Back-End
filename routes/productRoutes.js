const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rutas de productos
router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);

module.exports = router;  // Asegúrate de exportar correctamente el router
