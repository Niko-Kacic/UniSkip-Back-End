CREATE TABLE IF NOT EXISTS tipo_producto (
    id_tipo NUMBER PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS producto (
    id_producto NUMBER PRIMARY KEY,
    es_frio BOOLEAN,
    es_preparado BOOLEAN,
    valor NUMBER,
    stock NUMBER,
    id_tipo NUMBER,
    FOREIGN KEY (id_tipo) REFERENCES tipo_producto(id_tipo)
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
    id_pago NUMBER,
    FOREIGN KEY (rut_usuario) REFERENCES usuario(rut),
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
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
