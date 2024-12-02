CREATE TABLE IF NOT EXISTS tipo_producto (
    id_tipo NUMBER PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS tienda (
    id_tienda NUMBER PRIMARY KEY,
    nombre VARCHAR2(100) NOT NULL,
    ubicacion VARCHAR2(100) NOT NULL,
    logo VARCHAR2(255)
);

CREATE TABLE IF NOT EXISTS producto (
    id_producto NUMBER PRIMARY KEY,
    nombre VARCHAR2(100) NOT NULL,
    es_frio BOOLEAN,
    es_preparado BOOLEAN,
    valor NUMBER,
    stock NUMBER,
    id_tipo NUMBER,
    id_tienda NUMBER,
    FOREIGN KEY (id_tipo) REFERENCES tipo_producto(id_tipo),
    FOREIGN KEY (id_tienda) REFERENCES tienda(id_tienda)
);

CREATE TABLE IF NOT EXISTS usuario (
    rut NUMBER PRIMARY KEY,
    dv_rut NUMBER,
    nombre VARCHAR2(100),
    apellido VARCHAR2(100)
);

CREATE TABLE IF NOT EXISTS pedido (
    id_pedido NUMBER PRIMARY KEY,
    hora_pedido VARCHAR2(100),
    hora_entrega VARCHAR2(100),
    calentar BOOLEAN,
    cantidad NUMBER,
    valor NUMBER,
    estado VARCHAR2(100),
    rut_usuario NUMBER,
    id_producto NUMBER,
    id_tienda NUMBER,
    id_pago NUMBER,
    FOREIGN KEY (rut_usuario) REFERENCES usuario(rut),
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto),
    FOREIGN KEY (id_tienda) REFERENCES tienda(id_tienda)
);

CREATE TABLE IF NOT EXISTS estado_pedidos (
    estado VARCHAR2(100) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS pago (
    id_pago NUMBER PRIMARY KEY,
    monto_pago NUMBER,
    tipo_pago VARCHAR2(100),
    token_webpay VARCHAR2(100),
    hora_pago VARCHAR2(100),
    id_tipo_pago VARCHAR2(100)
);

CREATE TABLE IF NOT EXISTS tipo_pago (
    id_tipo VARCHAR2(100) PRIMARY KEY
);
