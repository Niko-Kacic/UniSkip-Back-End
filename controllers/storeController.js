// controllers/storeController.js
const storeModel = require('../models/storeModel');

// Función para listar todas las tiendas
exports.listarTiendas = (req, res) => {
  storeModel.listarTiendas()
    .then(tiendas => res.json({tiendas}))//nuevamente agrego promesas para mejor manejo de peticiones y errores
    .catch(err => res.status(500).json({error:'Error al obtener las tiendas'}));
};

// Función para obtener detalles de una tienda específica
exports.obtenerTiendaPorId = (req, res) => {
  const idTienda = req.params.id;
  if(!idTienda){//Agregado if para manejar en caso no se pase el id de tienda
    return res.status(400).json({error: 'Id de tienda requerido'});
  }
  
  storeModel.obtenerTiendaPorId(idTienda)
    .then((tienda) => {//Si adivinaste, agregue promesa para manejar respuestas
      if (!tienda) {
        return res.status(404).json({ error: "Tienda no encontrada." });
      }
      res.json({ tienda });
    })
    .catch((err) =>
      res
        .status(500)
        .json({ error: "Error al obtener los detalles de la tienda." })
    ); 
};
