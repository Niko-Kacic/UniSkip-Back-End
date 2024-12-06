const db = require('../database/database');  // Conexión a la base de datos

// Función para listar todas las tiendas
const listarTiendas = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM tienda';
    db.all(query, [], (err, rows) => {
      if (err) {
        console.error('Error en la consulta listarTiendas:', err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Función para obtener una tienda específica por su ID
const obtenerTiendaPorId = (idTienda) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM tienda WHERE id_tienda = ?';
    db.get(query, [idTienda], (err, row) => {
      if (err) {
        console.error('Error en la consulta obtenerTiendaPorId:', err);
        reject(err);
      } else if (!row) {
        console.warn(`Tienda con ID ${idTienda} no encontrada`);
        resolve(null);
      } else {
        resolve(row);
      }
    });
  });
};

module.exports = {
  listarTiendas,
  obtenerTiendaPorId,
};
