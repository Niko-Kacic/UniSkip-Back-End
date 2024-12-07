const { orderModel } = require('../models/indexModels');

// Confirmar el pedido
exports.confirmOrder = (req, res) => {
  const { orders } = req.body;
  if (!Array.isArray(orders)) {
    return res.status(400).json({ error: 'Orders debe ser un array' });
  }

  orderModel.confirmOrder(orders)
    .then(response => res.json(response))
    .catch(err => {
      console.error('Error al confirmar pedido:', err);
      res.status(400).json({ error: err.message });
    });
};

// Actualizar el estado del pedido
exports.updateOrderStatus = (req, res) => {
  const { id_pedido, estado } = req.body;

  orderModel.updateOrderStatus(id_pedido, estado)
    .then(() => res.json({ message: 'Estado del pedido actualizado exitosamente' }))
    .catch(err => {
      console.error('Error al actualizar el estado del pedido:', err);
      res.status(400).json({ error: err.message });
    });
};

// Listar pedidos por estado
exports.getOrdersByStatus = (req, res) => {
  const { estado } = req.query;

  orderModel.getOrdersByStatus(estado)
    .then(pedidos => res.json({ pedidos }))
    .catch(err => {
      console.error('Error al obtener los pedidos:', err);
      res.status(400).json({ error: err.message });
    });
};

// Realizar el pago
exports.createPayment = (req, res) => {
  const { monto_pago, tipo_pago, token_webpay, hora_pago, id_tipo_pago } = req.body;

  orderModel.createPayment(monto_pago, tipo_pago, token_webpay, hora_pago, id_tipo_pago)
    .then(paymentId => res.json({ message: 'Pago realizado', paymentId }))
    .catch(err => {
      console.error('Error al realizar el pago:', err);
      res.status(400).json({ error: err.message });
    });
};

// Asociar el pago con el pedido
exports.associatePaymentWithOrder = (req, res) => {
  const { id_pedido, id_pago } = req.body;

  orderModel.associatePaymentWithOrder(id_pedido, id_pago)
    .then(() => res.json({ message: 'Pago asociado al pedido' }))
    .catch(err => {
      console.error('Error al asociar el pago con el pedido:', err);
      res.status(400).json({ error: err.message });
    });
};

// Listar pedidos por tienda y estado
exports.getOrdersByStoreAndStatus = (req, res) => {
  const { storeId, status } = req.query;

  if (!storeId || !status) {
    return res.status(400).json({ error: 'Se requieren storeId y status' });
  }

  orderModel.getOrdersByStoreAndStatus(storeId, status)
    .then(pedidos => res.json({ pedidos }))
    .catch(err => {
      console.error('Error al obtener pedidos:', err);
      res.status(500).json({ error: 'Error al obtener pedidos' });
    });
};

// Obtener pedidos por usuario
exports.getOrdersByUser = (req, res) => {
  const { rut } = req.params;

  if (!rut) {
    return res.status(400).json({ error: 'RUT del usuario es requerido' });
  }

  orderModel.getOrdersByUser(rut)
    .then(orders => res.json(orders))
    .catch(err => {
      console.error('Error al obtener los pedidos por usuario:', err);
      res.status(500).json({ error: 'Error al obtener los pedidos' });
    });
};
