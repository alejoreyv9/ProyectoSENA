const moment = require("moment");
const connection = require("../database/db");

exports.getAllTareas = (req, res) => {
  connection.query("SELECT * FROM tareaasignar", (error, results) => {
    if (error) {
      console.error("Error al obtener tareas:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      results.forEach((tarea) => {
        tarea.fecha = moment(tarea.fecha).format("DD/MM/YYYY");
      });
      res.json(results);
    }
  });
};

exports.insertTarea = (req, res) => {
  const {
    asignada_por,
    seleciona_area,
    descripcion,
    fecha_Inicial,
    fecha_Final,
  } = req.body;
  connection.query(
    "INSERT INTO tareaAsignar (asignada_por, seleciona_area, descripcion, fecha_Inicial, fecha_Final) VALUES (?, ?, ?, ?, ?)",
    [asignada_por, seleciona_area, descripcion, fecha_Inicial, fecha_Final],
    (error, results) => {
      if (error) {
        console.error("Error al insertar tarea:", error);
        res.status(500).json({ error: "Error al asignar la tarea" });
      } else {
        res.status(201).json({
          message: "Tarea asignada correctamente",
          id: results.insertId,
        });
      }
    }
  );
};

exports.getTarea = (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM tareaasignar WHERE idTarea = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error al obtener tarea:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        if (results.length > 0) {
          res.json(results[0]);
        } else {
          res.status(404).json({ message: "Tarea no encontrada" });
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
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.json({ message: "Tarea actualizada correctamente" });
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
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.json({ message: "Tarea eliminada correctamente" });
      }
    }
  );
};
