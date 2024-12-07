const db = require('../database/database');

// Confirmar pedidos
const confirmOrder = (orders) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO pedido (hora_pedido, hora_entrega, calentar, cantidad, valor, estado, rut_usuario, id_producto, id_tienda, id_pago)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.serialize(() => {
      const stmt = db.prepare(query);
      orders.forEach(order => {
        stmt.run([
          order.hora_pedido || new Date().toISOString(), // Usa la fecha actual si no se proporciona
          order.hora_entrega || null, // Permite hora_entrega como opcional
          order.calentar || false, // Valor predeterminado
          order.cantidad,
          order.valor,
          order.estado || 'Pendiente', // Estado predeterminado
          order.rut_usuario,
          order.id_producto,
          order.id_tienda,
          order.id_pago || null // Permite id_pago como opcional
        ]);
      });
      stmt.finalize((err) => {
        if (err) {
          console.error('Error al confirmar pedidos:', err);
          reject(err);
        } else {
          resolve({ message: 'Pedidos confirmados exitosamente' });
        }
      });
    });
  });
};

// Actualizar estado del pedido
const updateOrderStatus = (id_pedido, estado) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE pedido
      SET estado = ?
      WHERE id_pedido = ?
    `;
    db.run(query, [estado, id_pedido], (err) => {
      if (err) {
        console.error('Error al actualizar el estado del pedido:', err);
        reject(err);
      } else {
        resolve({ id_pedido, estado });
      }
    });
  });
};

// Listar pedidos por estado
const getOrdersByStatus = (estado) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM pedido
      WHERE estado = ?
    `;
    db.all(query, [estado], (err, rows) => {
      if (err) {
        console.error('Error al obtener pedidos:', err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Listar pedidos por tienda y estado
const getOrdersByStoreAndStatus = (storeId, status) => {
  console.log('Ejecutando consulta con parámetros:', { storeId, status }); // Log de parámetros enviados
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM pedido
      WHERE id_tienda = ? AND estado = ?
    `;
    db.all(query, [storeId, status], (err, rows) => {
      if (err) {
        console.error('Error al obtener pedidos por tienda y estado:', err);
        reject(err);
      } else {
        console.log('Resultados obtenidos:', rows); // Log de resultados
        resolve(rows);
      }
    });
  });
};

// Registrar un pago
const createPayment = (monto_pago, tipo_pago, token_webpay, hora_pago, id_tipo_pago) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO pago (monto_pago, tipo_pago, token_webpay, hora_pago, id_tipo_pago)
      VALUES (?, ?, ?, ?, ?)
    `;
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
    const query = `
      UPDATE pedido
      SET id_pago = ?
      WHERE id_pedido = ?
    `;
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

// Obtener pedidos por usuario
const getOrdersByUser = (rutUsuario) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM pedido
      WHERE rut_usuario = ?
      ORDER BY hora_pedido DESC
    `;
    db.all(query, [rutUsuario], (err, rows) => {
      if (err) {
        console.error('Error al obtener pedidos por usuario:', err);
        reject(err);
      } else {
        console.log('Pedidos obtenidos para el usuario:', rows); // Log de los pedidos obtenidos
        resolve(rows);
      }
    });
  });
}

module.exports = {
  confirmOrder,
  updateOrderStatus,
  getOrdersByStatus,
  getOrdersByStoreAndStatus,
  getOrdersByUser, // Exporta el nuevo método
  createPayment,
  associatePaymentWithOrder,
};