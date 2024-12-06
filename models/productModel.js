const db = require('../database/database');  // Asegúrate de tener el módulo correcto para la conexión a la base de datos

// Obtener todos los productos
const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM producto';
    db.all(query, [], (err, rows) => {
      if (err) {
        console.error('Error en la consulta getAllProducts:', err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Obtener un producto por su ID
const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM producto WHERE id_producto = ?';
    db.get(query, [id], (err, row) => {
      if (err) {
        console.error('Error en la consulta getProductById:', err);
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Crear un nuevo producto
const createProduct = (productData) => {
  return new Promise((resolve, reject) => {
    const { nombre, es_frio, es_preparado, valor, stock, id_tipo, id_tienda } = productData;
    const query = 'INSERT INTO producto (nombre, es_frio, es_preparado, valor, stock, id_tipo, id_tienda) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.run(query, [nombre, es_frio, es_preparado, valor, stock, id_tipo, id_tienda], function (err) {
      if (err) {
        console.error('Error en la consulta createProduct:', err);
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
};

// Actualizar un producto existente
const updateProduct = (id, productData) => {
  return new Promise((resolve, reject) => {
    const { nombre, es_frio, es_preparado, valor, stock, id_tipo, id_tienda } = productData;
    const query = `UPDATE producto 
                   SET nombre = ?, es_frio = ?, es_preparado = ?, valor = ?, stock = ?, id_tipo = ?, id_tienda = ?
                   WHERE id_producto = ?`;
    db.run(query, [nombre, es_frio, es_preparado, valor, stock, id_tipo, id_tienda, id], (err) => {
      if (err) {
        console.error('Error en la consulta updateProduct:', err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// Eliminar un producto
const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM producto WHERE id_producto = ?';
    db.run(query, [id], (err) => {
      if (err) {
        console.error('Error en la consulta deleteProduct:', err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

