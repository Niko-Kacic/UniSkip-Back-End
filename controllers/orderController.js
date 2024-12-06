// controllers/orderController.js
const {orderModel} = require('../models/indexModels');

// Confirmar el pedido
exports.confirmOrder = (req, res) => {
  const { id_pedido, hora_entrega } = req.body;
  orderModel.confirmOrder(id_pedido, hora_entrega)
    .then(orderId => res.json({ message: 'Pedido confirmado', orderId }))
    .catch(err => {
      console.error('Error al confirmar el pedido:', err);
      res.status(400).json({ error: err.message });
    });
};

// Realizar el pago (moveremos esto a `paymentController.js`)
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
