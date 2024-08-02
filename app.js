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
      } else {
        res.render("registro", {
          alert: true,
          alertTitle: "Registrado",
          alertMessage: "¡Registro Exitoso!",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: "",
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
