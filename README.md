Endpoints del Back-End
Aquí están los endpoints que hemos configurado para interactuar con nuestro sistema:

Carrito de Compras
Agregar producto al carrito: POST /cart/add

Agregar producto al carrito con un ID específico: POST /cart/addWithId

Obtener el carrito de un usuario: GET /cart/:rut_usuario

Modificar la cantidad de un producto en el carrito: PUT /cart/update

Eliminar un producto del carrito: DELETE /cart/remove/:id_pedido

Vaciar el carrito: DELETE /cart/empty/:rut_usuario

Confirmar el pedido: POST /cart/confirm

Pedidos
Confirmar pedido: POST /orders/confirm

Asociar pago con pedido: POST /orders/payment/associate

Pagos
Realizar un pago: POST /payments/create

Obtener información de un pago: GET /payments/:id_pago

Notificaciones
Actualizar estado del pedido y enviar notificación: POST /notifications/update-state

Ejemplos de Cuerpo de Solicitud
Ejemplos de cuerpos de solicitud para cada endpoint, como lo que hicimos en Postman:

Agregar Producto al Carrito
json
{
  "rut_usuario": 12345678,
  "id_producto": 1,
  "cantidad": 2,
  "id_tienda": 1
}
Confirmar Pedido
json
{
  "id_pedido": 7,
  "hora_entrega": "2024-11-13 11:00"
}
Realizar un Pago
json
{
  "monto_pago": 5000,
  "tipo_pago": "Tarjeta",
  "token_webpay": "123456789",
  "hora_pago": "2024-11-13 10:30",
  "id_tipo_pago": 1,
  "id_pedido": 7
}
Actualizar Estado del Pedido
json
{
  "id_pedido": 7,
  "estado": "Entregado"
}
