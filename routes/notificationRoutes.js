// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Actualizar estado del pedido y enviar notificación
router.post('/update-state', notificationController.updateOrderState);

module.exports = router;
