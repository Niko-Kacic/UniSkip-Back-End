const db = require('../app');

exports.getAllProducts = (req, res) => {
  const query = 'SELECT * FROM producto';  // Asegúrate de que la consulta esté correctamente formateada
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json({ products: rows });
    }
  });
};

exports.createProduct = (req, res) => {
  const { es_frio, es_preparado, valor, stock, id_tipo } = req.body;
  const query = 'INSERT INTO producto (es_frio, es_preparado, valor, stock, id_tipo) VALUES (?, ?, ?, ?, ?)';
  db.run(query, [es_frio, es_preparado, valor, stock, id_tipo], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json({ message: 'Producto creado', productId: this.lastID });
    }
  });
};
