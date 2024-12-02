const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas de usuarios
router.get('/', userController.getAllUsers);
router.post("/",
    [//Se chequea el metodo POST que no esten vacios los campos
    check("rut").notEmpty().withMessage("El RUT es obligatorio"),
    check("dv_rut").notEmpty().withMessage("El dígito verificador es obligatorio"),
    check("nombre").notEmpty().withMessage("El nombre es obligatorio"),
    check("apellido").notEmpty().withMessage("El apellido es obligatorio"),
    ],
  userController.createUser);
router.delete('/:rut', userController.deleteUser);

module.exports = router;  // Asegúrate de exportar correctamente el router
