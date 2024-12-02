// models/productModel.js
const db = require('../app');

// Obtener todos los productos
const getAllProducts = (callback) => {
  const query = 'SELECT * FROM producto';
  db.all(query, [], (err, rows) => {
    callback(err, rows);
  });
};

// Crear un nuevo producto
const createProduct = (productData, callback) => {
  const { es_frio, es_preparado, valor, stock, id_tipo } = productData;
  const query = 'INSERT INTO producto (es_frio, es_preparado, valor, stock, id_tipo) VALUES (?, ?, ?, ?, ?)';
  db.run(query, [es_frio, es_preparado, valor, stock, id_tipo], function (err) {
    callback(err, this.lastID);
  });
};

// Actualizar un producto existente
const updateProduct = (id, productData, callback) => {
  const { es_frio, es_preparado, valor, stock, id_tipo } = productData;
  const query = `UPDATE producto 
                 SET es_frio = ?, es_preparado = ?, valor = ?, stock = ?, id_tipo = ?
                 WHERE id = ?`;
  db.run(query, [es_frio, es_preparado, valor, stock, id_tipo, id], (err) => {
    callback(err);
  });
};

// Eliminar un producto
const deleteProduct = (id, callback) => {
  const query = 'DELETE FROM producto WHERE id = ?';
  db.run(query, [id], (err) => {
    callback(err);
  });
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
