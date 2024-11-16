// models/storeModel.js
const db = require('../app');  // Conexión a la base de datos

// Función para listar todas las tiendas
const listarTiendas = (callback) => {
  const query = 'SELECT * FROM tienda'; 
  
  db.all(query, [], (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

// Función para obtener una tienda específica por su ID
const obtenerTiendaPorId = (idTienda, callback) => {
  const query = 'SELECT * FROM tienda WHERE id = ?';
  
  db.get(query, [idTienda], (err, row) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, row);
    }
  });
};

module.exports = {
  listarTiendas,
  obtenerTiendaPorId,
};
