const db = require('../app');

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

exports.createUser = [
  (req, res, next) => {//Se agrega validador en el req y en caso error retorna un json con el error (se debe manejar en el front, creo)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  (req, res) => {
    const { rut, dv_rut, nombre, apellido } = req.body;
    const query = 'INSERT INTO usuario (rut, dv_rut, nombre, apellido) VALUES (?, ?, ?, ?)';
    console.log(db);  // Agrega esta línea para ver el objeto db
    db.run(query, [rut, dv_rut, nombre, apellido], function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.json({ message: 'Usuario creado', userId: this.lastID });
      }
    });
  }
];


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

