// controllers/storeController.js
const { storeModel } = require('../models/indexModels');  // Asegúrate de que la importación está correcta

// Función para listar todas las tiendas
exports.listarTiendas = (req, res) => {
  console.log("Entrando a listar tiendas")
  storeModel.listarTiendas()
    .then(tiendas => res.json({ tiendas })) // Agrego promesas para mejor manejo de peticiones y errores
    .catch(err => {
      console.log("Error de nuevo")
      res.status(500).json({ error: 'Error al obtener las tiendas.' })});
};

// Función para obtener detalles de una tienda específica
exports.obtenerTiendaPorId = (req, res) => {
  const idTienda = req.params.id;
  if (!idTienda) { // Agregado if para manejar en caso no se pase el id de tienda
    return res.status(400).json({ error: 'ID de tienda requerido.' });
  }

  storeModel.obtenerTiendaPorId(idTienda)
    .then((tienda) => { // Agrego promesa para manejar respuestas
      if (!tienda) {
        return res.status(404).json({ error: 'Tienda no encontrada.' });
      }
      res.json({ tienda });
    })
    .catch((err) =>
      res.status(500).json({ error: 'Error al obtener los detalles de la tienda.' })
    );
};

