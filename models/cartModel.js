// models/cartModel.js
const db = require('../app');

// Agregar un producto al carrito
const addProductToCart = (rut_usuario, id_producto, cantidad, id_tienda, callback) => {
  const query = 'INSERT INTO pedido (rut_usuario, id_producto, cantidad, id_tienda, estado) VALUES (?, ?, ?, ?, "en carrito")';
  db.run(query, [rut_usuario, id_producto, cantidad, id_tienda], function (err) {
    callback(err, this.lastID);
  });
};

// Obtener el carrito de un usuario
const getCartByUser = (rut_usuario, callback) => {
  const query = `
    SELECT p.id_pedido, p.id_producto, pr.nombre, p.cantidad, pr.valor, p.estado 
    FROM pedido p 
    JOIN producto pr ON p.id_producto = pr.id_producto 
    WHERE p.rut_usuario = ? AND p.estado = "en carrito"
  `;
  db.all(query, [rut_usuario], (err, rows) => {
    callback(err, rows);
  });
};

// Modificar la cantidad de un producto en el carrito
const updateProductQuantity = (id_pedido, cantidad, callback) => {
  const query = 'UPDATE pedido SET cantidad = ? WHERE id_pedido = ? AND estado = "en carrito"';
  db.run(query, [cantidad, id_pedido], (err) => {
    callback(err);
  });
};

// Eliminar un producto del carrito
const removeProductFromCart = (id_pedido, callback) => {
  const query = 'DELETE FROM pedido WHERE id_pedido = ? AND estado = "en carrito"';
  db.run(query, [id_pedido], (err) => {
    callback(err);
  });
};

// Vaciar el carrito (eliminar todos los productos)
const emptyCart = (rut_usuario, callback) => {
  const query = 'DELETE FROM pedido WHERE rut_usuario = ? AND estado = "en carrito"';
  db.run(query, [rut_usuario], (err) => {
    callback(err);
  });
};

// Confirmar el pedido (cambiar el estado de los productos del carrito a "confirmado")
const confirmOrder = (rut_usuario, id_pago, hora_entrega, callback) => {
  const query = `
    UPDATE pedido
    SET estado = "confirmado", hora_entrega = ?, id_pago = ?
    WHERE rut_usuario = ? AND estado = "en carrito"
  `;
  db.run(query, [hora_entrega, id_pago, rut_usuario], (err) => {
    callback(err);
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
