// controllers/storeController.js
const storeModel = require('../models/storeModel');

// Función para listar todas las tiendas
exports.listarTiendas = (req, res) => {
  storeModel.listarTiendas((err, tiendas) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener las tiendas.' });
    } else {
      res.json({ tiendas });
    }
  });
};

// Función para obtener detalles de una tienda específica
exports.obtenerTiendaPorId = (req, res) => {
  const idTienda = req.params.id;
  
  storeModel.obtenerTiendaPorId(idTienda, (err, tienda) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener los detalles de la tienda.' });
    } else if (!tienda) {
      res.status(404).json({ error: 'Tienda no encontrada.' });
    } else {
      res.json({ tienda });
    }
  });
};
