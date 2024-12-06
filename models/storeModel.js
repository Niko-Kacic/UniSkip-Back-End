const db = require('../database/database');  // Conexión a la base de datos

// Función para listar todas las tiendas
const listarTiendas = () => {
  // Retorna una promesa que resolverá con las filas obtenidas o rechazará con un error
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM tienda';
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);  // Rechaza la promesa si ocurre un error
      } else {
        resolve(rows);  // Resuelve la promesa con las filas obtenidas
      }
    });
  });
};

// Función para obtener una tienda específica por su ID
const obtenerTiendaPorId = (idTienda) => {
  // Retorna una promesa que resolverá con la fila obtenida o rechazará con un error
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM tienda WHERE id = ?';
    db.get(query, [idTienda], (err, row) => {
      if (err) {
        reject(err);  // Rechaza la promesa si ocurre un error
      } else {
        resolve(row);  // Resuelve la promesa con la fila obtenida
      }
    });
  });
};

module.exports = {
  listarTiendas,
  obtenerTiendaPorId,
};
