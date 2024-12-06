// controllers/cartController.js
const {cartModel} = require('../models/indexModels');

// Agregar un producto al carrito
exports.addProductToCart = (req, res) => {
  const { rut_usuario, id_producto, cantidad, id_tienda } = req.body;
  cartModel.addProductToCart(rut_usuario, id_producto, cantidad, id_tienda)
    .then(productId => res.json({ message: 'Producto agregado al carrito', productId }))
    .catch(err => {
      console.error('Error al agregar producto al carrito:', err);
      res.status(400).json({ error: err.message });
    });
};

// Obtener el carrito de un usuario
exports.getCartByUser = (req, res) => {
  const rut_usuario = req.params.rut_usuario;
  cartModel.getCartByUser(rut_usuario)
    .then(cartItems => res.json({ cart: cartItems }))
    .catch(err => {
      console.error('Error al obtener el carrito del usuario:', err);
      res.status(400).json({ error: err.message });
    });
};

// Modificar la cantidad de un producto en el carrito
exports.updateProductQuantity = (req, res) => {
  const { id_pedido, cantidad } = req.body;
  cartModel.updateProductQuantity(id_pedido, cantidad)
    .then(() => res.json({ message: 'Cantidad actualizada' }))
    .catch(err => {
      console.error('Error al actualizar la cantidad del producto en el carrito:', err);
      res.status(400).json({ error: err.message });
    });
};

// Eliminar un producto del carrito
exports.removeProductFromCart = (req, res) => {
  const id_pedido = req.params.id_pedido;
  cartModel.removeProductFromCart(id_pedido)
    .then(() => res.json({ message: 'Producto eliminado del carrito' }))
    .catch(err => {
      console.error('Error al eliminar el producto del carrito:', err);
      res.status(400).json({ error: err.message });
    });
};

// Vaciar el carrito
exports.emptyCart = (req, res) => {
  const rut_usuario = req.params.rut_usuario;
  cartModel.emptyCart(rut_usuario)
    .then(() => res.json({ message: 'Carrito vacío' }))
    .catch(err => {
      console.error('Error al vaciar el carrito:', err);
      res.status(400).json({ error: err.message });
    });
};

// Confirmar el pedido
exports.confirmOrder = (req, res) => {
  const { rut_usuario, id_pago, hora_entrega } = req.body;
  cartModel.confirmOrder(rut_usuario, id_pago, hora_entrega)
    .then(() => res.json({ message: 'Pedido confirmado' }))
    .catch(err => {
      console.error('Error al confirmar el pedido:', err);
      res.status(400).json({ error: err.message });
    });
};
