const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const orderRoutes = require("./routes/orderRoutes"); // Importa las rutas de pedidos
const db = require("./database/database");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("¡Bienvenido al servidor de Uni-Skip!");
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Uso de las rutas
app.use("/products", require("./routes/productRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/orders", orderRoutes); // Asegúrate de usar las rutas de pedidos aquí
app.use("/payments", require("./routes/paymentRoutes"));
app.use("/stores", require("./routes/storeRoutes"));
app.use("/cart", require("./routes/cartRoutes"));
app.use("/notifications", require("./routes/notificationRoutes"));

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

module.exports = db;
