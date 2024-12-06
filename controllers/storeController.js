// controllers/storeController.js
const { storeModel } = require("../models/indexModels");

// Función para listar todas las tiendas
exports.listarTiendas = (req, res) => {
  console.log("Entrando a listar tiendas");
  storeModel.listarTiendas()
    .then(tiendas => res.json({ tiendas }))
    .catch(err => {
      console.error("Error al obtener las tiendas:", err);
      res.status(500).json({ error: 'Error al obtener las tiendas.' });
    });
};

// Función para obtener detalles de una tienda específica
exports.obtenerTiendaPorId = (req, res) => {
  const idTienda = req.params.id;
  console.log(`Entrando a obtener tienda por ID: ${idTienda}`);
  if (!idTienda) {
    return res.status(400).json({ error: 'ID de tienda requerido.' });
  }

  storeModel.obtenerTiendaPorId(idTienda)
    .then(tienda => {
      if (!tienda) {
        return res.status(404).json({ error: 'Tienda no encontrada.' });
      }
      res.json({ tienda });
    })
    .catch(err => {
      console.error("Error al obtener los detalles de la tienda:", err);
      res.status(500).json({ error: 'Error al obtener los detalles de la tienda.' });
    });
};
