// controllers/orderController.js
const orderModel = require('../models/orderModel');

// Confirmar el pedido
exports.confirmOrder = (req, res) => {
  const { id_pedido, hora_entrega } = req.body;
  orderModel.confirmOrder(id_pedido, hora_entrega, (err, orderId) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json({ message: 'Pedido confirmado', orderId });
    }
  });
};

// Realizar el pago
exports.createPayment = (req, res) => {
  const { monto_pago, tipo_pago, token_webpay, hora_pago, id_tipo_pago } = req.body;
  orderModel.createPayment(monto_pago, tipo_pago, token_webpay, hora_pago, id_tipo_pago, (err, paymentId) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json({ message: 'Pago realizado', paymentId });
    }
  });
};

// Asociar el pago con el pedido
exports.associatePaymentWithOrder = (req, res) => {
  const { id_pedido, id_pago } = req.body;
  orderModel.associatePaymentWithOrder(id_pedido, id_pago, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json({ message: 'Pago asociado al pedido' });
    }
  });
};
