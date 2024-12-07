const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check, validationResult } = require('express-validator');

// Rutas de usuarios
router.get('/', userController.getAllUsers);
router.get('/profile', userController.getProfile);

router.post(
  '/',
  [
    check('rut').notEmpty().withMessage('El RUT es obligatorio'),
    check('dv_rut').notEmpty().withMessage('El dígito verificador es obligatorio'),
    check('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    check('apellido').notEmpty().withMessage('El apellido es obligatorio'),
  ],
  userController.createUser
);

router.delete('/:rut', userController.deleteUser);

// Ruta para registrar usuario
router.post(
  '/register',
  [
    check('rut').notEmpty().withMessage('El RUT es obligatorio'),
    check('dv_rut').notEmpty().withMessage('El dígito verificador es obligatorio'),
    check('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    check('apellido').notEmpty().withMessage('El apellido es obligatorio'),
    check('email').notEmpty().withMessage('El email es obligatorio').isEmail().withMessage('Debe ser un email válido'),
    check('password')
      .notEmpty()
      .withMessage('La contraseña es obligatoria')
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener al menos 6 caracteres'),
  ],
  userController.register
);

// Ruta para iniciar sesión
router.post(
  '/login',
  [
    check('email').notEmpty().withMessage('El email es obligatorio').isEmail().withMessage('Debe ser un email válido'),
    check('password').notEmpty().withMessage('La contraseña es obligatoria'),
  ],
  userController.login
);

// Ruta para cerrar sesión
router.post('/logout', userController.logout);

module.exports = router;
