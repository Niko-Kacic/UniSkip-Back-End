// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Agregar producto al carrito
router.post('/add', cartController.addProductToCart);

// Obtener el carrito de un usuario
router.get('/:rut_usuario', cartController.getCartByUser);

// Modificar cantidad de un producto en el carrito
router.put('/update', cartController.updateProductQuantity);

// Eliminar producto del carrito
router.delete('/remove/:id_pedido', cartController.removeProductFromCart);

// Vaciar el carrito
router.delete('/empty/:rut_usuario', cartController.emptyCart);

// Confirmar pedido
router.post('/confirm', cartController.confirmOrder);

module.exports = router;
