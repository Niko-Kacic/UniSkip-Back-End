// controllers/productController.js
const productModel = require('../models/productModel');

// Obtener todos los productos
exports.getAllProducts = (req, res) => {
  productModel.getAllProducts((err, products) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json({ products });
    }
  });
};

// Crear un nuevo producto
exports.createProduct = (req, res) => {
  const productData = req.body;
  productModel.createProduct(productData, (err, productId) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json({ message: 'Producto creado', productId });
    }
  });
};

// Actualizar un producto
exports.updateProduct = (req, res) => {
  const id = req.params.id;
  const productData = req.body;
  productModel.updateProduct(id, productData, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json({ message: 'Producto actualizado' });
    }
  });
};

// Eliminar un producto
exports.deleteProduct = (req, res) => {
  const id = req.params.id;
  productModel.deleteProduct(id, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json({ message: 'Producto eliminado' });
    }
  });
};
