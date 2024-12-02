// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rutas de productos
router.get('/', productController.getAllProducts);            // Listar productos
router.post('/', productController.createProduct);            // Crear un nuevo producto
router.put('/:id', productController.updateProduct);          // Actualizar un producto existente
router.delete('/:id', productController.deleteProduct);       // Eliminar un producto

module.exports = router;  // Exportar el router
