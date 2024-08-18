const express = require("express");
const app = express();
const bcryptjs = require("bcryptjs");
const session = require("express-session");
const connection = require("./database/db");
require("dotenv").config();
const path = require("path");

// Configuración de Express y middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/resources", express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// Configuración de sesiones
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Redireccionar la ruta raíz a la página de inicio de sesión
app.get("/", (req, res) => {
  res.redirect("/login");
});

// Ruta para la página de inicio de sesión
app.get("/login", (req, res) => {
  res.render("login");
});

// Ruta para la página de registro
app.get("/registro", (req, res) => {
  res.render("registro");
});

//=================================================================
//=================================================================
//===================RUTAS PARA LAS API============================

const tareasAPIRouter = require("./routers/tareasAPIRouter");
const calidadAPIRouter = require("./routers/calidadAPIRouter");
const reportesAPIRouter = require("./routers/reportesAPIRouter");
//========GESTION DE BODEGA=========
const bodegaAPIRouter = require("./routers/bodegaAPIRouter");
const productoApiRouter = require("./routers/productoAPIRouter");
const bodegaProductoRouter = require("./routers/bodegaProductoAPIRouter");

app.use("/api/tareas", tareasAPIRouter);
app.use("/api/calidad", calidadAPIRouter);
app.use("/api/reportes", reportesAPIRouter);
//========GESTION DE BODEGA===========
app.use("/api/bodegas", bodegaAPIRouter);
app.use("/api/productos", productoApiRouter);
app.use("/api/bodega_productos", bodegaProductoRouter);

//=================================================================
//=================================================================

// =========== CONEXIONES DE LOS ROUTERS ===============
app.use("/tareas", require("./routers/tareasRouter"));
app.use("/dashboard", require("./routers/dashboardRouter"));
app.use("/calidad", require("./routers/calidadRouter"));
app.use("/reportes", require("./routers/reporteRouter"));

// Integracion de informacion de bodega
app.use("/bodegas", require("./routers/bodegaRouter"));
app.use("/productos", require("./routers/productoRouter"));
app.use("/bodega_producto", require("./routers/bodegaProductoRouter"));

// Manejador de solicitud para el formulario de registro
app.post("/registro", async (req, res) => {
  const {
    nombreApellido,
    cedula,
    roles,
    departamento,
    correo,
    contraseña,
    nombreUsuario,
  } = req.body;
  let passwordHash = await bcryptjs.hash(contraseña, 8);
  connection.query(
    "INSERT INTO usuarios SET ?",
    {
      nombreApellido,
      cedula,
      roles,
      departamento,
      correo,
      contraseña: passwordHash,
      nombreUsuario,
    },
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Error en el registro del usuario",
        });
      } else {
        res.status(201).json({
          success: true,
          message: "¡Registro Exitoso!",
        });
      }
    }
  );
});

// JSON PARA LA GESTION Traida de la informacion
// =========================================================

app.post("/registro", async (req, res) => {
  const {
    nombreApellido,
    cedula,
    roles,
    departamento,
    correo,
    contraseña,
    nombreUsuario,
  } = req.body;

  try {
    let passwordHash = await bcryptjs.hash(contraseña, 8);
    connection.query(
      "INSERT INTO usuarios SET ?",
      {
        nombreApellido,
        cedula,
        roles,
        departamento,
        correo,
        contraseña: passwordHash,
        nombreUsuario,
      },
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({
            success: false,
            message: "Error en el registro del usuario",
          });
        } else {
          res.status(201).json({
            success: true,
            message: "¡Registro Exitoso!",
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error en el registro del usuario",
    });
  }
});

// Para obtenerlos por el ID
app.get("/usuario/:idUsuario", (req, res) => {
  const { idUsuario } = req.params;
  console.log(`Recibido idUsuario: ${idUsuario}`); // Para depuración
  connection.query(
    "SELECT * FROM usuarios WHERE idUsuario = ?",
    [idUsuario],
    (error, results) => {
      if (error) {
        console.error("Error en la consulta:", error); // Para depuración
        res.status(500).json({
          success: false,
          message: "Error al recuperar los datos del usuario",
        });
      } else if (results.length === 0) {
        console.log("Usuario no encontrado"); // Para depuración
        res.status(404).json({
          success: false,
          message: "Usuario no encontrado",
        });
      } else {
        console.log("Usuario encontrado:", results[0]); // Para depuración
        res.status(200).json({
          success: true,
          data: results[0],
        });
      }
    }
  );
});

// EDITAR USUARIO COMO TAL.
app.put("/usuario/:idUsuario", (req, res) => {
  const { idUsuario } = req.params;
  const { nombreApellido, roles, departamento, correo, nombreUsuario } =
    req.body;

  // Asegúrate de validar los datos si es necesario
  if (!nombreApellido || !roles || !departamento || !correo || !nombreUsuario) {
    return res.status(400).json({
      success: false,
      message: "Todos los campos son necesarios",
    });
  }

  connection.query(
    "UPDATE usuarios SET nombreApellido = ?, roles = ?, departamento = ?, correo = ?, nombreUsuario = ? WHERE idUsuario = ?",
    [nombreApellido, roles, departamento, correo, nombreUsuario, idUsuario],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Error al actualizar el usuario",
        });
      } else if (results.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Usuario actualizado exitosamente",
        });
      }
    }
  );
});

// Manejador de solicitud para la autenticación
app.post("/auth", async (req, res) => {
  const { nombreUsuario, contraseña } = req.body;
  if (nombreUsuario && contraseña) {
    connection.query(
      "SELECT * FROM usuarios WHERE nombreUsuario = ?",
      [nombreUsuario],
      async (error, results) => {
        if (
          results.length == 0 ||
          !(await bcryptjs.compare(contraseña, results[0].contraseña))
        ) {
          res.render("login", {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Correo y/o contraseña incorrectos",
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: "login",
          });
        } else {
          req.session.loggedin = true;
          req.session.name = results[0].nombreApellido;
          req.session.area = results[0].departamento;
          res.render("login", {
            alert: true,
            alertTitle: "Conexión Exitosa",
            alertMessage: "¡LOGIN CORRECTO!",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 1500,
            ruta: "index",
          });
        }
      }
    );
  } else {
    res.render("login", {
      alert: true,
      alertTitle: "Advertencia",
      alertMessage: "Por favor ingrese un correo y contraseña válidos",
      alertIcon: "warning",
      showConfirmButton: true,
      timer: false,
      ruta: "login",
    });
  }
});

// Ruta para el dashboard después de iniciar sesión
app.get("/index", (req, res) => {
  if (req.session.loggedin) {
    res.render("index", {
      login: true,
      name: req.session.name,
      area: req.session.area,
    });
  } else {
    res.render("index", {
      login: false,
      name: "Debe iniciar sesión",
    });
  }
  res.end();
});

// Ruta para cerrar sesión
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

// Configurar rutas para las páginas adicionales
app.get("/tareas", (req, res) => {
  res.render("tareas");
});

const bodegaProductoController = require("./controllers/bodegaProductoController");
app.get("/bodega", bodegaProductoController.getAllBodegaProductos);

app.get("/calidad", (req, res) => {
  res.render("calidad");
});

app.get("/reportes", (req, res) => {
  res.render("reportes");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.get("/profile_menu", (req, res) => {
  res.render("profile_menu");
});

app.get("/editTareas", (req, res) => {
  res.render("editTareas");
});

app.get("/editCalidad", (req, res) => {
  res.render("editCalidad");
});
app.get("/editReportes", (req, res) => {
  res.render("editReportes");
});

app.get("/editBodega", (req, res) => {
  res.render("editBodega");
});
app.get("/editProducto", (req, res) => {
  res.render("editProducto");
});
app.get("/editBodegaProducto", (req, res) => {
  res.render("editBodegaProducto");
});

// Informacion de Bodega COMO TAL.

app.get("/bodegas", (req, res) => {
  res.render("bodegas");
});

app.get("/productos", (req, res) => {
  res.render("productos");
});

app.get("/bodega_producto", (req, res) => {
  res.render("bodega_producto");
});

// Mirar errores

// Manejo de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).send("Lo siento, no pudimos encontrar esa página.");
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal!");
});

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Debuggear

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor de NODEJS corriendo en: http://localhost:3000");
});
