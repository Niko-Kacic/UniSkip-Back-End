// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Confirmar el pedido
router.post('/confirm', orderController.confirmOrder);

// Realizar el pago (moveremos esto a `paymentRoutes.js`)
router.post('/payment', orderController.createPayment);

// Asociar el pago con el pedido
router.post('/payment/associate', orderController.associatePaymentWithOrder);

module.exports = router;
