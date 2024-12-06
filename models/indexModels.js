//Deje centralizado los models para sea más facil su importación a otros archivos
// models/index.js
const cartModel = require('./cartModel');
const notificationModel = require('./notificationModel');
const orderModel = require('./orderModel');
const productModel = require('./productModel');
const storeModel = require('./storeModel');

module.exports = {
  cartModel,
  notificationModel,
  orderModel,
  productModel,
  storeModel,
};
