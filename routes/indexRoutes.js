//Deje centralizado los models para sea más facil su importación a otros archivos
const cartRoutes = require('./cartRoutes');
const notificationRoutes = require('./notificationRoutes');
const orderRoutes = require('./orderRoutes');
const paymentRoutes = require('./paymentRoutes');
const productRoutes = require('./productRoutes');
const storeRoutes = require('./storeRoutes');
const testRoutes = require('./testRoutes');
const userRoutes = require('./userRoutes');

module.exports = {
  cartRoutes,
  notificationRoutes,
  orderRoutes,
  paymentRoutes,
  productRoutes,
  storeRoutes,
  testRoutes,
  userRoutes,
};
