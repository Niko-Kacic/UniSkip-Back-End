const db = require('../database/database');

// Confirmar pedido
const confirmOrder = (orders) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO pedido (hora_pedido, hora_entrega, calentar, cantidad, valor, estado, rut_usuario, id_producto, id_tienda, id_pago) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.serialize(() => {
      const stmt = db.prepare(query);
      for (const order of orders) {
        stmt.run([order.hora_pedido, order.hora_entrega, order.calentar, order.cantidad, order.valor, order.estado, order.rut_usuario, order.id_producto, order.id_tienda, order.id_pago]);
      }
      stmt.finalize((err) => {
        if (err) {
          console.error('Error al confirmar pedido:', err);
          reject(err);
        } else {
          resolve({ message: 'Pedido confirmado exitosamente' });
        }
      });
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
