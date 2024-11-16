// routes/storeRoutes.js
const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

// Ruta para listar todas las tiendas
router.get('/', storeController.listarTiendas);

// Ruta para obtener los detalles de una tienda por su ID
router.get('/:id', storeController.obtenerTiendaPorId);

module.exports = router;
