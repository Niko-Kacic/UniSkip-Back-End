// models/notificationModel.js
const db = require('../database/database');

// Actualizar estado del pedido
const updateOrderState = (id_pedido, estado, callback) => {
  const query = 'UPDATE pedido SET estado = ? WHERE id_pedido = ?';
  db.run(query, [estado, id_pedido], function(err) {
    callback(err, this.changes);
  });
};

// Enviar notificación del cambio de estado
const sendNotification = (id_pedido, estado, callback) => {
  const notificationMessage = `El estado de su pedido con ID ${id_pedido} ha sido actualizado a ${estado}.`;
  // Aquí podrías integrar un sistema real de notificaciones, por ejemplo, enviar un correo o una notificación push.
  console.log(notificationMessage); // Simulación del envío de la notificación
  callback(null, { id_pedido, estado, message: notificationMessage });
};

module.exports = {
  updateOrderState,
  sendNotification,
};
