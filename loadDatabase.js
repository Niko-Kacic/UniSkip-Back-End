const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Conectar a la base de datos SQLite
const db = new sqlite3.Database('./database/uni-skip.db', (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos SQLite.');
  }
});

// Leer el archivo SQL
const sqlFile = path.join(__dirname, 'database', 'database.sql');
fs.readFile(sqlFile, 'utf8', (err, sqlData) => {
  if (err) {
    console.error('Error al leer el archivo SQL:', err);
  } else {
    // Ejecutar las consultas SQL
    db.exec(sqlData, (err) => {
      if (err) {
        console.error('Error al ejecutar el archivo SQL:', err);
      } else {
        console.log('Tablas creadas exitosamente.');
      }
    });
  }
});
