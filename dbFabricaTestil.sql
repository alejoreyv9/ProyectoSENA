CREATE	DATABASE proyecFabricacion;

USE proyecFabricacion;

SELECT * FROM proyecfabricacion.usuarios;




DROP TABLE reporteFabricacion;

CREATE TABLE usuarios (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nombreApellido VARCHAR(100) NOT NULL,
    cedula VARCHAR(20) NOT NULL UNIQUE,
    roles VARCHAR(50) NOT NULL,
    departamento VARCHAR(50) NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE
);


CREATE TABLE tareaAsignar (
	idTarea  INT AUTO_INCREMENT PRIMARY KEY,
    asignada_por VARCHAR(255),
    seleciona_area VARCHAR(225),
    descripcion TEXT,
    fecha_Inicial DATE,
    fecha_Final DATE
);

CREATE TABLE bodega (
	idBodega INT AUTO_INCREMENT PRIMARY KEY,
    codigo INT NOT NULL,
    accion VARCHAR(255),
    tipo VARCHAR(255),
    nombre VARCHAR(255),
    fecha DATE,
    cantidad INT, 
    pedidos VARCHAR(255)
    );

CREATE TABLE reporteCalidad (
	idCalidad INT AUTO_INCREMENT PRIMARY KEY,
    hecho_por VARCHAR(255),
    comentario TEXT,
    problema VARCHAR(255),
    medio VARCHAR(255),
    excelente VARCHAR(255)
);

CREATE TABLE reporteFabricacion (
	idReporte INT AUTO_INCREMENT PRIMARY KEY,
    nombreOperario VARCHAR(255),
    cargo VARCHAR(255),
    fecha DATE,
    reporteDescripcion TEXT
);

CREATE TABLE operario (
	idOperario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_Apellido VARCHAR(255),
    cargo VARCHAR(255),
    departamentoTrabajo VARCHAR(255)
);

