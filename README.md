# Documentación de API

## Endpoints del Back-End

### Carrito de Compras
- **Agregar producto al carrito**: `POST /cart/add`
- **Agregar producto al carrito con un ID específico**: `POST /cart/addWithId`
- **Obtener el carrito de un usuario**: `GET /cart/:rut_usuario`
- **Modificar la cantidad de un producto en el carrito**: `PUT /cart/update`
- **Eliminar un producto del carrito**: `DELETE /cart/remove/:id_pedido`
- **Vaciar el carrito**: `DELETE /cart/empty/:rut_usuario`
- **Confirmar el pedido**: `POST /cart/confirm`

### Pedidos
- **Confirmar pedido**: `POST /orders/confirm`
- **Asociar pago con pedido**: `POST /orders/payment/associate`

### Pagos
- **Realizar un pago**: `POST /payments/create`
- **Obtener información de un pago**: `GET /payments/:id_pago`

### Notificaciones
- **Actualizar estado del pedido y enviar notificación**: `POST /notifications/update-state`

## Ejemplos de Cuerpo de Solicitud

### Agregar Producto al Carrito
```json
{
  "rut_usuario": 12345678,
  "id_producto": 1,
  "cantidad": 2,
  "id_tienda": 1
}

###Confirmar Pedido
{
  "id_pedido": 7,
  "hora_entrega": "2024-11-13 11:00"
}
