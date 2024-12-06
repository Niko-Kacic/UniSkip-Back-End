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

// Registrar un pago
const createPayment = (monto_pago, tipo_pago, token_webpay, hora_pago, id_tipo_pago) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO pago (monto_pago, tipo_pago, token_webpay, hora_pago, id_tipo_pago) VALUES (?, ?, ?, ?, ?)';
    db.run(query, [monto_pago, tipo_pago, token_webpay, hora_pago, id_tipo_pago], function (err) {
      if (err) {
        console.error('Error al registrar el pago:', err);
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
};

// Asociar el pago con un pedido
const associatePaymentWithOrder = (id_pedido, id_pago) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE pedido SET id_pago = ? WHERE id_pedido = ?';
    db.run(query, [id_pago, id_pedido], (err) => {
      if (err) {
        console.error('Error al asociar el pago con el pedido:', err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  confirmOrder,
  createPayment,
  associatePaymentWithOrder,
};
