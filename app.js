const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/indexRoutes"); // Aquí están las rutas centralizadas
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

module.exports = db;
