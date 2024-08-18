const connection = require("../database/db");

exports.getAllReportes = (req, res) => {
  connection.query("SELECT * FROM reporteFabricacion", (error, results) => {
    if (error) {
      console.error("Error al obtener reportes: ", error);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      res.json(results);
    }
  });
};

exports.insertReporte = (req, res) => {
  const { nombreOperario, cargo, fecha, reporteDescripcion } = req.body;
  connection.query(
    "INSERT INTO reporteFabricacion (nombreOperario, cargo, fecha, reporteDescripcion) VALUES (?, ?, ?, ?)",
    [nombreOperario, cargo, fecha, reporteDescripcion],
    (error, results) => {
      if (error) {
        console.error("Error al insertar reporte:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res
          .status(201)
          .json({
            message: "Reporte creado correctamente",
            id: results.insertId,
          });
      }
    }
  );
};

exports.getReporte = (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM reporteFabricacion WHERE idReporte = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error al obtener reporte: ", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        if (results.length > 0) {
          res.json(results[0]);
        } else {
          res.status(404).json({ message: "Reporte no encontrado" });
        }
      }
    }
  );
};

exports.updateReporte = (req, res) => {
  const { nombreOperario, cargo, fecha, reporteDescripcion } = req.body;
  const id = req.params.id;
  connection.query(
    "UPDATE reporteFabricacion SET nombreOperario = ?, cargo = ?, fecha = ?, reporteDescripcion = ? WHERE idReporte = ?",
    [nombreOperario, cargo, fecha, reporteDescripcion, id],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar reporte:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.json({ message: "Reporte actualizado correctamente" });
      }
    }
  );
};

exports.deleteReporte = (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM reporteFabricacion WHERE idReporte = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error al eliminar reporte: ", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.json({ message: "Reporte eliminado correctamente" });
      }
    }
  );
};
