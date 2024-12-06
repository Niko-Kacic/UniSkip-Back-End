// controllers/paymentController.js
const {paymentModel} = require('../models/indexModels');

// Crear un nuevo pago
exports.createPayment = (req, res) => {
  const { monto_pago, tipo_pago, token_webpay, hora_pago, id_tipo_pago, id_pedido } = req.body;
  paymentModel.createPayment(monto_pago, tipo_pago, token_webpay, hora_pago, id_tipo_pago)
    .then(id_pago => {
      return paymentModel.associatePaymentWithOrder(id_pedido, id_pago)
        .then(() => res.json({ message: 'Pago realizado con éxito.', id_pago }));
    })
    .catch(err => {
      console.error('Error al procesar el pago:', err);
      res.status(400).json({ error: err.message });
    });
};

// Consultar información del pago
exports.getPayment = (req, res) => {
  const { id_pago } = req.params;
  paymentModel.getPayment(id_pago)
    .then(paymentInfo => {
      if (!paymentInfo) {
        return res.status(404).json({ error: 'Pago no encontrado.' });
      }
      res.json(paymentInfo);
    })
    .catch(err => {
      console.error('Error al obtener la información del pago:', err);
      res.status(400).json({ error: err.message });
    });
};
