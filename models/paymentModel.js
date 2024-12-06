// models/paymentModel.js
const db = require('../database/database');

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

// Obtener información del pago
const getPayment = (id_pago) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM pago WHERE id_pago = ?';
    db.get(query, [id_pago], (err, row) => {
      if (err) {
        console.error('Error al obtener la información del pago:', err);
        reject(err);
      } else {
        resolve(row);
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
  createPayment,
  getPayment,
  associatePaymentWithOrder,
};
