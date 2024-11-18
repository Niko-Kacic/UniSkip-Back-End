// controllers/paymentController.js
const db = require('../app');

// Crear un nuevo pago
exports.createPayment = (req, res) => {
  const { monto_pago, tipo_pago, token_webpay, hora_pago, id_tipo_pago, id_pedido } = req.body;

  // Insertar nuevo pago en la base de datos
  const query = `INSERT INTO pago (monto_pago, tipo_pago, token_webpay, hora_pago, id_tipo_pago) 
                 VALUES (?, ?, ?, ?, ?)`;
  
  db.run(query, [monto_pago, tipo_pago, token_webpay, hora_pago, id_tipo_pago], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Error al procesar el pago.' });
    }

    // Obtener el id_pago generado
    const id_pago = this.lastID;

    // Actualizar el estado del pedido con el id_pago
    const updateQuery = `UPDATE pedido SET id_pago = ? WHERE id_pedido = ?`;
    
    db.run(updateQuery, [id_pago, id_pedido], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error al asociar el pago al pedido.' });
      }

      res.status(200).json({
        message: 'Pago realizado con éxito.',
        id_pago: id_pago
      });
    });
  });
};

// Consultar información del pago
exports.getPayment = (req, res) => {
  const { id_pago } = req.params;

  const query = `SELECT * FROM pago WHERE id_pago = ?`;
  db.get(query, [id_pago], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener la información del pago.' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Pago no encontrado.' });
    }

    res.status(200).json({
      id_pago: row.id_pago,
      monto_pago: row.monto_pago,
      tipo_pago: row.tipo_pago,
      token_webpay: row.token_webpay,
      hora_pago: row.hora_pago,
      id_tipo_pago: row.id_tipo_pago
    });
  });
};
