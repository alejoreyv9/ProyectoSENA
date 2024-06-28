const connection = require("../database/db");

// Obtener todos los reportes
exports.getAllReporte = (req, res) => {
  connection.query("SELECT * FROM reporteFabricacion", (error, results) => {
    if (error) {
      console.error("Error al obtener Reportes: ", error);
      res
        .status(500)
        .send("Error interno del servidor de Reporte de Informacion:");
    } else {
      res.render("reporte", { results });
    }
  });
};

// Insert reportes

exports.insertReporte = (req, res) => {
  const { nombreOperario, cargo, fecha, reporteDescripcion } = req.body;
  connection.query(
    "INSERT INTO reporteFabricacion (nombreOperario, cargo, fecha, reporteDescripcion) VALUES (?, ?, ?, ?)",
    [nombreOperario, cargo, fecha, reporteDescripcion],
    (error, results) => {
      if (error) {
        console.error("Error al insertar Reporte:", error);
        res
          .status(500)
          .send(
            "Error interno del servidor de Reporte de Informacion: " + error
          );
        return;
      } else {
        res.redirect("/reporte");
      }
    }
  );
};

// Editar Reporte
exports.editReporte = (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM reporteFabricacion WHERE idReporte = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error al obtener el reporte: ", error);
        res
          .status(500)
          .send("Error interno del servidor de Reporte de Informacion:");
      } else {
        res.render("editReporte", { reporte: results[0] });
      }
    }
  );
};

// Actualizar el reporte
exports.updateReporte = (req, res) => {
  const { nombreOperario, cargo, fecha, reporteDescripcion } = req.body;
  connection.query(
    "UPDATE reporteFabricacion SET nombreOperario = ?, cargo = ?, fecha = ?, reporteDescripcion = ?",
    [nombreOperario, cargo, fecha, reporteDescripcion, id],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar el reporte de Informacion:", error);
        res
          .status(500)
          .send(
            "Error interno del servidor de Reporte de Informacion: " + error
          );
      } else {
        console.log("Reporte actualizada correctamente.");
        res.redirect("/dashboard");
      }
    }
  );
};

// Eliminar caulquier Reporte
exports.deleteReporte = (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM reporteFabricacion WHERE idReporte = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error al eliminar un Reporte de informacion: ", error);
        res
          .status(500)
          .send("Error interno del servidor de Reporte de Informacion:");
      } else {
        res.redirect("/dashboard");
      }
    }
  );
};
