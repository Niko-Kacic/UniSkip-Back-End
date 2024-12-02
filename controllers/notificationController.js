// controllers/notificationController.js
const notificationModel = require('../models/notificationModel');

// Cambiar estado del pedido
exports.updateOrderState = (req, res) => {
  const { id_pedido, estado } = req.body;
  
  notificationModel.updateOrderState(id_pedido, estado, (err, changes) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (changes === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    // Enviar notificación del cambio de estado
    notificationModel.sendNotification(id_pedido, estado, (err, notification) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      res.json({
        message: `Estado del pedido actualizado a "${estado}"`,
        notification: notification,
      });
    });
  });
};
