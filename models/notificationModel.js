// models/notificationModel.js
const db = require('../app');

// Enviar notificación de estado de pedido
const sendNotification = (id_pedido, estado, callback) => {
  const query = 'SELECT u.nombre, u.apellido, p.estado, p.hora_pedido, p.hora_entrega, t.nombre AS tienda_nombre ' +
                'FROM pedido p ' +
                'JOIN usuario u ON p.rut_usuario = u.rut ' +
                'JOIN tienda t ON p.id_tienda = t.id_tienda ' +
                'WHERE p.id_pedido = ?';

  db.get(query, [id_pedido], (err, row) => {
    if (err) {
      return callback(err);
    }
    if (row) {
      // Enviar notificación al usuario
      const notification = {
        usuario: row.nombre + ' ' + row.apellido,
        estado: row.estado,
        hora_pedido: row.hora_pedido,
        hora_entrega: row.hora_entrega,
        tienda: row.tienda_nombre,
      };
      callback(null, notification);
    } else {
      callback('Pedido no encontrado');
    }
  });
};

// Actualizar estado del pedido
const updateOrderState = (id_pedido, estado, callback) => {
  const query = 'UPDATE pedido SET estado = ? WHERE id_pedido = ?';
  db.run(query, [estado, id_pedido], function (err) {
    callback(err, this.changes);
  });
};

module.exports = {
  sendNotification,
  updateOrderState,
};
