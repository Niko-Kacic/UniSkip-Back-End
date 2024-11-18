// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Ruta para crear un pago
router.post('/create', paymentController.createPayment);

// Ruta para obtener la información de un pago
router.get('/:id_pago', paymentController.getPayment);

module.exports = router;
