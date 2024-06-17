const express = require("express");
const app = express();
const bcryptjs = require("bcryptjs");
const session = require("express-session");
const connection = require("./database/db");

require("dotenv").config();

// Configuración de Express y middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/resources", express.static("public"));
app.set("view engine", "ejs");

const path = require("path");

app.set("views", path.join(__dirname, "views"));

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

// ===========CONEXIONES DE LOS ROUTERS ===============
app.use("/tareas", require("./routers/tareas"));
app.use("/dashboard", require("./routers/dashboard"));

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

// // Manejador de solicitud para insertar en la base de datos la información de la bodega
// app.post("/insertarBodega", (req, res) => {
//   const { codigo, tipo, nombre, fecha, cantidad, pedido } = req.body;
//   connection.query(
//     "INSERT INTO tablaBodega (codigo, tipo, nombre, fecha, cantidad, pedido) VALUES (?, ?, ?, ?, ?, ?)",
//     [codigo, tipo, nombre, fecha, cantidad, pedido],
//     (error, results) => {
//       if (error) {
//         console.error("Error al insertar en la bodega:", error);
//         res.render("bodega", {
//           alert: true,
//           alertTitle: "Error",
//           alertMessage: "Hubo un error al ingresar los datos en la bodega",
//           alertIcon: "error",
//           showConfirmButton: true,
//           timer: false,
//           ruta: "bodega",
//         });
//       } else {
//         res.render("bodega", {
//           alert: true,
//           alertTitle: "Datos ingresados",
//           alertMessage: "Los datos se ingresaron correctamente",
//           alertIcon: "success",
//           showConfirmButton: false,
//           timer: 1500,
//           ruta: "index",
//         });
//       }
//     }
//   );
// });

// // Manejador de solicitud para insertar en la base de datos la información de calidad
// app.post("/insertarCalidad", (req, res) => {
//   const { hecho_por, comentario, problema, medio, excelente } = req.body;
//   connection.query(
//     "INSERT INTO reporteCalidad (hecho_por, comentario, problema, medio, excelente) VALUES (?, ?, ?, ?, ?)",
//     [hecho_por, comentario, problema, medio, excelente],
//     (error, results) => {
//       if (error) {
//         console.error("Error al insertar en reporteCalidad:", error);
//         res.render("calidad", {
//           alert: true,
//           alertTitle: "Error",
//           alertMessage: "Hubo un error al ingresar los datos en reporteCalidad",
//           alertIcon: "error",
//           showConfirmButton: true,
//           timer: false,
//           ruta: "calidad",
//         });
//       } else {
//         res.render("calidad", {
//           alert: true,
//           alertTitle: "Datos ingresados",
//           alertMessage: "Los datos se ingresaron correctamente",
//           alertIcon: "success",
//           showConfirmButton: false,
//           timer: 1500,
//           ruta: "index",
//         });
//       }
//     }
//   );
// });

// // Manejador de solicitud para insertar en la base de datos la información del reporte
// app.post("/insertarReporteInformacion", (req, res) => {
//   const { nombreOperario, cargo, fecha, reporteDescripcion } = req.body;
//   connection.query(
//     "INSERT INTO reporteFabricacion (nombreOperario, cargo, fecha, reporteDescripcion) VALUES (?, ?, ?, ?)",
//     [nombreOperario, cargo, fecha, reporteDescripcion],
//     (error, results) => {
//       if (error) {
//         console.error("Error al insertar en reporte de fabricación:", error);
//         res.render("reporteInformacion", {
//           alert: true,
//           alertTitle: "Error",
//           alertMessage:
//             "Hubo un error al ingresar los datos en el reporte de fabricación",
//           alertIcon: "error",
//           showConfirmButton: true,
//           timer: false,
//           ruta: "reportes",
//         });
//       } else {
//         res.render("reporteInformacion", {
//           alert: true,
//           alertTitle: "Datos ingresados",
//           alertMessage: "Los datos se ingresaron correctamente",
//           alertIcon: "success",
//           showConfirmButton: false,
//           timer: 1500,
//           ruta: "index",
//         });
//       }
//     }
//   );
// });

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor de NODEJS corriendo en: http://localhost:3000");
});
