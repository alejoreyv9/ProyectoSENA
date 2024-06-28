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
app.use("/reporte", require("./routers/reporteRouter"));

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

app.get("/bodega", (req, res) => {
  res.render("bodega");
});

app.get("/calidad", (req, res) => {
  res.render("calidad");
});

app.get("/reportes", (req, res) => {
  res.render("reportes");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.get("/editTareas", (req, res) => {
  res.render("editTareas");
});

app.get("/editCalidad", (req, res) => {
  res.render("editCalidad");
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor de NODEJS corriendo en: http://localhost:3000");
});
