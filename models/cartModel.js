// models/cartModel.js
const db = require('../database/database');

// Agregar un producto al carrito
const addProductToCart = (rut_usuario, id_producto, cantidad, id_tienda) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO pedido (rut_usuario, id_producto, cantidad, id_tienda, estado) VALUES (?, ?, ?, ?, "en carrito")';
    db.run(query, [rut_usuario, id_producto, cantidad, id_tienda], function (err) {
      if (err) {
        console.error('Error al agregar producto al carrito:', err);
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
};

// Obtener el carrito de un usuario
const getCartByUser = (rut_usuario) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT p.id_pedido, p.id_producto, pr.nombre, p.cantidad, pr.valor, p.estado 
      FROM pedido p 
      JOIN producto pr ON p.id_producto = pr.id_producto 
      WHERE p.rut_usuario = ? AND p.estado = "en carrito"
    `;
    db.all(query, [rut_usuario], (err, rows) => {
      if (err) {
        console.error('Error al obtener el carrito del usuario:', err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Modificar la cantidad de un producto en el carrito
const updateProductQuantity = (id_pedido, cantidad) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE pedido SET cantidad = ? WHERE id_pedido = ? AND estado = "en carrito"';
    db.run(query, [cantidad, id_pedido], (err) => {
      if (err) {
        console.error('Error al actualizar la cantidad del producto en el carrito:', err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// Eliminar un producto del carrito
const removeProductFromCart = (id_pedido) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM pedido WHERE id_pedido = ? AND estado = "en carrito"';
    db.run(query, [id_pedido], (err) => {
      if (err) {
        console.error('Error al eliminar el producto del carrito:', err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// Vaciar el carrito (eliminar todos los productos)
const emptyCart = (rut_usuario) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM pedido WHERE rut_usuario = ? AND estado = "en carrito"';
    db.run(query, [rut_usuario], (err) => {
      if (err) {
        console.error('Error al vaciar el carrito:', err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// Confirmar el pedido (cambiar el estado de los productos del carrito a "confirmado")
const confirmOrder = (rut_usuario, id_pago, hora_entrega) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE pedido
      SET estado = "confirmado", hora_entrega = ?, id_pago = ?
      WHERE rut_usuario = ? AND estado = "en carrito"
    `;
    db.run(query, [hora_entrega, id_pago, rut_usuario], (err) => {
      if (err) {
        console.error('Error al confirmar el pedido:', err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  addProductToCart,
  getCartByUser,
  updateProductQuantity,
  removeProductFromCart,
  emptyCart,
  confirmOrder,
};
