const express = require("express");
const router = express.Router();
const connection = require("../database/db");

router.get("/", (req, res) => {
  res.render("tareas");
});

router.post("/insertarTarea", (req, res) => {
  const {
    asignado_por,
    selecciona_area,
    descripcion,
    fecha_inicial,
    fecha_final,
  } = req.body;
  connection.query(
    "INSERT INTO tareaAsignar (asignada_por, seleciona_area, descripcion, fecha_Inicial, fecha_Final) VALUES (?, ?, ?, ?, ?)",
    [asignado_por, selecciona_area, descripcion, fecha_inicial, fecha_final],
    (error, results) => {
      if (error) {
        console.error("Error al insertar tarea:", error);
        res.render("tareas", {
          alert: true,
          alertTitle: "Error",
          alertMessage: "Hubo un error al asignar la tarea",
          alertIcon: "error",
          showConfirmButton: true,
          timer: false,
          ruta: "tareas",
        });
      } else {
        res.render("tareas", {
          alert: true,
          alertTitle: "Tarea Asignada",
          alertMessage: "La tarea se asignó correctamente",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: "index", // Cambia a la ruta a la que deseas redirigir
        });
      }
    }
  );
});

router.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  const {
    asignada_por,
    selecciona_area,
    descripcion,
    fecha_inicial,
    fecha_final,
  } = req.body;
  connection.query(
    "UPDATE tareaAsignar SET asignada_por = ?, selecciona_area = ?, descripcion = ?, fecha_Inicial = ?, fecha_Final = ? WHERE idTarea = ?",
    [
      asignada_por,
      selecciona_area,
      descripcion,
      fecha_inicial,
      fecha_final,
      id,
    ],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar tarea:", error);
        res.status(500).send("Error interno del servidor");
      } else {
        res.redirect("/dashboard"); // Redirige después de la actualización
      }
    }
  );
});

// Ruta para eliminar tarea por ID
router.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM tareaasignar WHERE idTarea = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error al eliminar tarea:", error);
        res.status(500).send("Error interno del servidor");
      } else {
        res.redirect("/dashboard");
      }
    }
  );
});

module.exports = router;
