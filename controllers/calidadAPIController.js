const connection = require("../database/db");

exports.getAllCalidad = (req, res) => {
  connection.query("SELECT * FROM reporteCalidad", (error, results) => {
    if (error) {
      console.error("Error al obtener reportes de calidad: ", error);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      res.json(results);
    }
  });
};

exports.insertCalidad = (req, res) => {
  const { hecho_por, comentario, nivelCalidad } = req.body;
  connection.query(
    "INSERT INTO reporteCalidad (hecho_por, comentario, nivelCalidad) VALUES (?, ?, ?)",
    [hecho_por, comentario, nivelCalidad],
    (error, results) => {
      if (error) {
        console.error("Error al insertar reporte de calidad:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res
          .status(201)
          .json({
            message: "Reporte de calidad creado correctamente",
            id: results.insertId,
          });
      }
    }
  );
};

exports.getCalidad = (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM reporteCalidad WHERE idCalidad = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error al obtener reporte de calidad: ", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        if (results.length > 0) {
          res.json(results[0]);
        } else {
          res.status(404).json({ message: "Reporte de calidad no encontrado" });
        }
      }
    }
  );
};

exports.updateCalidad = (req, res) => {
  const { hecho_por, comentario, nivelCalidad } = req.body;
  const id = req.params.id;
  connection.query(
    "UPDATE reporteCalidad SET hecho_por = ?, comentario = ?, nivelCalidad = ? WHERE idCalidad = ?",
    [hecho_por, comentario, nivelCalidad, id],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar reporte de calidad:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.json({ message: "Reporte de calidad actualizado correctamente" });
      }
    }
  );
};

exports.deleteCalidad = (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM reporteCalidad WHERE idCalidad = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error al eliminar reporte de calidad: ", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.json({ message: "Reporte de calidad eliminado correctamente" });
      }
    }
  );
};
