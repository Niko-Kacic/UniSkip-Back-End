// models/storeModel.js
const db = require('../app');  // Conexión a la base de datos

// Función para listar todas las tiendas
const listarTiendas = () => {
  //Cambie el callback por una promesa, en caso la respuesta no sea inediata
  return new Promise((resolve, reject)=>{
    const query = 'SELECT * FROM tienda'; 
    db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
    });
  });
};

// Función para obtener una tienda específica por su ID
const obtenerTiendaPorId = (idTienda) => {
  //Al igual que en listar tiendas, el callback es cambiado por una promesa
  return new Promise((resolve, reject)=>{
    const query = 'SELECT * FROM tienda WHERE id = ?';
    db.get(query, [idTienda], (err, row) => {
      if (err) {
        reject(err);
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
