const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs"); // Para leer el archivo SQL

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("¡Bienvenido al servidor de Uni-Skip!");
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos SQLite
const db = new sqlite3.Database("./database/uni-skip.db", (err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
  } else {
    console.log("Conectado a la base de datos SQLite.");
    loadDatabaseSQL();
  }
});

// Cargar archivo SQL
const loadDatabaseSQL = () => {
  const sql = fs.readFileSync("./database/database.sql", "utf8");
  db.exec(sql, (err) => {
    if (err) {
      console.error("Error al ejecutar el archivo SQL:", err);
    } else {
      console.log("Archivo SQL ejecutado correctamente.");
    }
  });
};

const routes = require("./routes"); //Aqui estan las rutas centralizadas

//Uso de las rutas
app.use("/products", routes.productRoutes);
app.use("/users", routes.userRoutes);
app.use("/orders", routes.orderRoutes);
app.use("/payments", routes.paymentRoutes);
app.use("/stores", routes.storeRoutes);
app.use("/cart", routes.cartRoutes);
app.use("/notifications", routes.notificationRoutes);

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

module.exports = db; //Movi el export al final por si acaso!
