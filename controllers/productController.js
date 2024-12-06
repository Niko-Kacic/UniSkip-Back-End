// controllers/productController.js
const { productModel } = require('../models/indexModels');

// Obtener todos los productos
exports.getAllProducts = (req, res) => {
  console.log("Entrando a getAllProducts");
  productModel.getAllProducts()
    .then(products => res.json({ products }))
    .catch(err => {
      console.error('Error al obtener productos:', err);
      res.status(400).json({ error: err.message });
    });
};

// Obtener un producto por su ID
exports.getProductById = (req, res) => {
  const id = req.params.id;
  console.log(`Entrando a getProductById con ID: ${id}`);
  productModel.getProductById(id)
    .then(product => {
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json({ product });
    })
    .catch(err => {
      console.error('Error al obtener el producto:', err);
      res.status(400).json({ error: err.message });
    });
};

// Crear un nuevo producto
exports.createProduct = (req, res) => {
  const productData = req.body;
  console.log("Creando nuevo producto:", productData);
  productModel.createProduct(productData)
    .then(productId => res.json({ message: 'Producto creado', productId }))
    .catch(err => {
      console.error('Error al crear producto:', err);
      res.status(400).json({ error: err.message });
    });
};

// Actualizar un producto
exports.updateProduct = (req, res) => {
  const id = req.params.id;
  const productData = req.body;
  console.log(`Actualizando producto con ID ${id}:`, productData);
  productModel.updateProduct(id, productData)
    .then(() => res.json({ message: 'Producto actualizado' }))
    .catch(err => {
      console.error('Error al actualizar producto:', err);
      res.status(400).json({ error: err.message });
    });
};

// Eliminar un producto
exports.deleteProduct = (req, res) => {
  const id = req.params.id;
  console.log(`Eliminando producto con ID ${id}`);
  productModel.deleteProduct(id)
    .then(() => res.json({ message: 'Producto eliminado' }))
    .catch(err => {
      console.error('Error al eliminar producto:', err);
      res.status(400).json({ error: err.message });
    });
};
