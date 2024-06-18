// controllers/tareasController.js
const connection = require("../database/db");

exports.getAllTareas = (req, res) => {
  connection.query("SELECT * FROM tareaasignar", (error, results) => {
    if (error) {
      console.error("Error al obtener tareas:", error);
      res.status(500).send("Error interno del servidor");
    } else {
      res.render("tareas", { results });
    }
  });
};

exports.insertTarea = (req, res) => {
  const {
    asignado_por,
    selecciona_area,
    descripcion,
    fecha_inicial,
    fecha_final,
  } = req.body;
  connection.query(
    "INSERT INTO tareaasignar (asignada_por, seleciona_area, descripcion, fecha_inicial, fecha_final) VALUES (?, ?, ?, ?, ?)",
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
          ruta: "index",
        });
      }
    }
  );
};

exports.editTarea = (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM tareaasignar WHERE idTarea = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error al obtener tarea:", error);
        res.status(500).send("Error interno del servidor");
      } else {
        if (results.length > 0) {
          res.render("editTareas", { tarea: results[0] });
        } else {
          res.status(404).send("Tarea no encontrada");
        }
      }
    }
  );
};

exports.updateTarea = (req, res) => {
  const id = req.params.id;
  const {
    asignada_por,
    selecciona_area,
    descripcion,
    fecha_inicial,
    fecha_final,
  } = req.body;
  connection.query(
    "UPDATE tareaasignar SET asignada_por = ?, seleciona_area = ?, descripcion = ?, fecha_inicial = ?, fecha_final = ? WHERE idTarea = ?",
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
        res.status(500).send("Error interno del servidor: " + error);
        return;
      } else {
        res.redirect("/tareas");
      }
    }
  );
};

exports.deleteTarea = (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM tareaasignar WHERE idTarea = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error al eliminar tarea:", error);
        res.status(500).send("Error interno del servidor");
      } else {
        res.redirect("/tareas");
      }
    }
  );
};
