const db = require('../database/database');

// Confirmar el pedido (cambiar el estado a 'confirmado')
const confirmOrder = (id_pedido, hora_entrega) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE pedido SET estado = "confirmado", hora_entrega = ? WHERE id_pedido = ? AND estado = "en carrito"';
    db.run(query, [hora_entrega, id_pedido], function (err) {
      if (err) {
        console.error('Error al confirmar el pedido:', err);
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
};

module.exports = {
  confirmOrder,
};
