const db = require('../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Obtener todos los usuarios
exports.getAllUsers = (req, res) => {
  const query = 'SELECT * FROM usuario';
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error al obtener los usuarios:', err.message);
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    } else {
      res.json({ users: rows });
    }
  });
};

// Crear usuario
exports.createUser = [
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  (req, res) => {
    const { rut, dv_rut, nombre, apellido } = req.body;
    const query = 'INSERT INTO usuario (rut, dv_rut, nombre, apellido) VALUES (?, ?, ?, ?)';
    db.run(query, [rut, dv_rut, nombre, apellido], function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.json({ message: 'Usuario creado', userId: this.lastID });
      }
    });
  },
];

// Eliminar usuario
exports.deleteUser = (req, res) => {
  const { rut } = req.params;
  const query = 'DELETE FROM usuario WHERE rut = ?';
  db.run(query, [rut], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json({ message: 'Usuario eliminado', changes: this.changes });
    }
  });
};

// Registrar usuario
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rut, dv_rut, nombre, apellido, email, password } = req.body;

  try {
    const queryCheckEmail = 'SELECT * FROM usuario WHERE email = ?';
    db.all(queryCheckEmail, [email], async (err, rows) => {
      if (err) {
        return res.status(500).json({ message: 'Error al verificar el email', details: err.message });
      }

      if (rows.length > 0) {
        return res.status(400).json({ message: 'El email ya está registrado' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const query = 'INSERT INTO usuario (rut, dv_rut, nombre, apellido, email, password) VALUES (?, ?, ?, ?, ?, ?)';
      db.run(query, [rut, dv_rut, nombre, apellido, email, hashedPassword], function (err) {
        if (err) {
          return res.status(500).json({ error: 'Error al registrar el usuario', details: err.message });
        }

        res.status(201).json({ message: 'Usuario registrado exitosamente', userId: this.lastID });
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
};

// Inicio de sesión
exports.login = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  // Verificar si es un usuario
  const queryUser = 'SELECT * FROM usuario WHERE email = ?';
  db.get(queryUser, [email], async (err, user) => {
    if (err) {
      console.error('Error al buscar usuario:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    if (user) {
      try {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: 'Contraseña incorrecta' });
        }
        const token = jwt.sign({ id: user.rut }, 'tu_secreto_jwt', { expiresIn: '1h' });
        return res.json({ message: 'Inicio de sesión exitoso', token, isStore: false });
      } catch (error) {
        return res.status(500).json({ error: 'Error interno del servidor', details: error.message });
      }
    }

    // Si no es usuario, verificar si es una tienda
    const queryStore = 'SELECT * FROM tienda WHERE email = ?';
    db.get(queryStore, [email], async (err, store) => {
      if (err) {
        console.error('Error al buscar tienda:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }

      if (!store) {
        return res.status(404).json({ message: 'Usuario o tienda no encontrado' });
      }

      try {
        const isMatch = await bcrypt.compare(password, store.password); // Comparar la contraseña hash
        if (!isMatch) {
          return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar token para tienda
        const token = jwt.sign({ id: store.id_tienda }, 'tu_secreto_jwt', { expiresIn: '1h' });
        res.json({ message: 'Inicio de sesión exitoso', token, isStore: true, storeId: store.id_tienda });
      } catch (error) {
        console.error('Error al verificar contraseña de tienda:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    });
  });
};

// Cerrar sesión
exports.logout = (req, res) => {
  res.status(200).json({ message: 'Sesión cerrada exitosamente' });
};

// Obtener datos del usuario autenticado
exports.getProfile = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token' });
  }

  try {
    const decoded = jwt.verify(token, 'tu_secreto_jwt');
    const query = 'SELECT rut, dv_rut, nombre, apellido, email FROM usuario WHERE rut = ?';
    db.get(query, [decoded.id], (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Error al obtener el perfil', details: err.message });
      }

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.json(user);
    });
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido', details: error.message });
  }
};
