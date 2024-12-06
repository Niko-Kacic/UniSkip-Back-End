// Conexión a la base de datos SQLite
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/uni-skip.db', (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos SQLite.');
    loadDatabaseSQL();
  }
});

const loadDatabaseSQL = () => {
  const fs = require('fs');
  const sql = fs.readFileSync('./database/database.sql', 'utf8');
  db.exec(sql, (err) => {
    if (err) {
      console.error('Error al ejecutar el archivo SQL:', err);
    } else {
      console.log('Archivo SQL ejecutado correctamente.');
    }
  });
};

module.exports = db;
