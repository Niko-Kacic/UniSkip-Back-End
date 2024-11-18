// models/orderModel.js
const db = require('../app');

// Confirmar el pedido (cambiar el estado a 'confirmado')
const confirmOrder = (id_pedido, hora_entrega, callback) => {
  const query = 'UPDATE pedido SET estado = "confirmado", hora_entrega = ? WHERE id_pedido = ? AND estado = "en carrito"';
  db.run(query, [hora_entrega, id_pedido], function (err) {
    callback(err, this.lastID);
  });
};

// Registrar un pago
const createPayment = (monto_pago, tipo_pago, token_webpay, hora_pago, id_tipo_pago, callback) => {
  const query = 'INSERT INTO pago (monto_pago, tipo_pago, token_webpay, hora_pago, id_tipo_pago) VALUES (?, ?, ?, ?, ?)';
  db.run(query, [monto_pago, tipo_pago, token_webpay, hora_pago, id_tipo_pago], function (err) {
    callback(err, this.lastID);
  });
};

// Asociar el pago con un pedido
const associatePaymentWithOrder = (id_pedido, id_pago, callback) => {
  const query = 'UPDATE pedido SET id_pago = ? WHERE id_pedido = ?';
  db.run(query, [id_pago, id_pedido], (err) => {
    callback(err);
  });
};

module.exports = {
  confirmOrder,
  createPayment,
  associatePaymentWithOrder,
};
