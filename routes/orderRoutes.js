const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Ruta para confirmar un pedido
router.post('/confirm', orderController.confirmOrder);

// Ruta para actualizar el estado del pedido
router.put('/update-status', orderController.updateOrderStatus);

// Ruta para listar pedidos por estado
router.get('/list-by-status', orderController.getOrdersByStatus);

// Ruta para crear un pago
router.post('/create-payment', orderController.createPayment);

// Ruta para asociar un pago con un pedido
router.post('/associate-payment', orderController.associatePaymentWithOrder);

// Ruta para listar pedidos por tienda y estado
router.get('/store-orders', orderController.getOrdersByStoreAndStatus);

// Ruta para obtener pedidos por usuario
router.get('/user/:rut', orderController.getOrdersByUser);

module.exports = router;
