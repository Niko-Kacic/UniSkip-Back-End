const db = require("../database/database"); // Asegúrate de tener el módulo correcto para la conexión a la base de datos

// Obtener todos los productos
const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM producto";
    db.all(query, [], (err, rows) => {
      if (err) {
        console.error("Error en la consulta getAllProducts:", err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};


// Obtener productos por tienda
const getProductsByStore = (id_tienda) => {
  return new Promise((resolve, reject) => {
    console.log('ID de tienda para la consulta:', id_tienda); // Agregar mensaje de depuración
    const query = 'SELECT * FROM producto WHERE id_tienda = ?';
    db.all(query, [id_tienda], (err, rows) => {
      if (err) {
        console.error('Error al obtener productos por tienda:', err);
        reject(err);
      } else {
        console.log('Productos obtenidos de la base de datos:', rows); // Agregar mensaje de depuración
        resolve(rows);
      }
    });
  });
};


// Obtener un producto por su ID
const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM producto WHERE id_producto = ?";
    db.get(query, [id], (err, row) => {
      if (err) {
        console.error("Error en la consulta getProductById:", err);
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
    const { nombre, es_frio, es_preparado, valor, stock, id_tipo, id_tienda } =
      productData;
    const query =
      "INSERT INTO producto (nombre, es_frio, es_preparado, valor, stock, id_tipo, id_tienda) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.run(
      query,
      [nombre, es_frio, es_preparado, valor, stock, id_tipo, id_tienda],
      function (err) {
        if (err) {
          console.error("Error en la consulta createProduct:", err);
          reject(err);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
};

// Actualizar un producto existente
const updateProduct = (id, productData) => {
  return new Promise((resolve, reject) => {
    const { nombre, es_frio, es_preparado, valor, stock, id_tipo, id_tienda } =
      productData;
    const query = `UPDATE producto 
                   SET nombre = ?, es_frio = ?, es_preparado = ?, valor = ?, stock = ?, id_tipo = ?, id_tienda = ?
                   WHERE id_producto = ?`;
    db.run(
      query,
      [nombre, es_frio, es_preparado, valor, stock, id_tipo, id_tienda, id],
      (err) => {
        if (err) {
          console.error("Error en la consulta updateProduct:", err);
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

// Eliminar un producto
const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM producto WHERE id_producto = ?";
    db.run(query, [id], (err) => {
      if (err) {
        console.error("Error en la consulta deleteProduct:", err);
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
  getProductsByStore,
};
