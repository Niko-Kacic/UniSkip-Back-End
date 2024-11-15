const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas de usuarios
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.delete('/:rut', userController.deleteUser);

module.exports = router;  // Asegúrate de exportar correctamente el router
