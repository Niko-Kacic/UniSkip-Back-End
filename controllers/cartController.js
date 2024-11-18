// controllers/cartController.js
const cartModel = require('../models/cartModel');

// Agregar un producto al carrito
exports.addProductToCart = (req, res) => {
  const { rut_usuario, id_producto, cantidad, id_tienda } = req.body;
  cartModel.addProductToCart(rut_usuario, id_producto, cantidad, id_tienda, (err, productId) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json({ message: 'Producto agregado al carrito', productId });
    }
  });
};

// Obtener el carrito de un usuario
exports.getCartByUser = (req, res) => {
  const rut_usuario = req.params.rut_usuario;
  cartModel.getCartByUser(rut_usuario, (err, cartItems) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json({ cart: cartItems });
    }
  });
};

// Modificar la cantidad de un producto en el carrito
exports.updateProductQuantity = (req, res) => {
  const { id_pedido, cantidad } = req.body;
  cartModel.updateProductQuantity(id_pedido, cantidad, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json({ message: 'Cantidad actualizada' });
    }
  });
};

// Eliminar un producto del carrito
exports.removeProductFromCart = (req, res) => {
  const id_pedido = req.params.id_pedido;
  cartModel.removeProductFromCart(id_pedido, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json({ message: 'Producto eliminado del carrito' });
    }
  });
};

// Vaciar el carrito
exports.emptyCart = (req, res) => {
  const rut_usuario = req.params.rut_usuario;
  cartModel.emptyCart(rut_usuario, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json({ message: 'Carrito vacío' });
    }
  });
};

// Confirmar el pedido
exports.confirmOrder = (req, res) => {
  const { rut_usuario, id_pago, hora_entrega } = req.body;
  cartModel.confirmOrder(rut_usuario, id_pago, hora_entrega, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json({ message: 'Pedido confirmado' });
    }
  });
};
