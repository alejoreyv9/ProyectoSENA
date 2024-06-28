const connection = require("../database/db");

// Obtener todas las tareas de calidad
exports.getAllCalidad = (req, res) => {
  connection.query("SELECT * FROM reporteCalidad", (error, results) => {
    if (error) {
      console.error("Error al obtener tareas: ", error);
      res.status(500).send("Error interno del servidor.");
    } else {
      res.render("calidad", { results });
    }
  });
};

// Insertar calidad
exports.insertCalidad = (req, res) => {
  const { hecho_por, comentario, nivelCalidad } = req.body;
  connection.query(
    "INSERT INTO reporteCalidad (hecho_por, comentario, nivelCalidad) VALUES (?, ?, ?)",
    [hecho_por, comentario, nivelCalidad],
    (error, results) => {
      if (error) {
        console.error("Error al insertar calidad:", error);
        res.status(500).send("Error interno del servidor: " + error);
        return;
      } else {
        res.redirect("/calidad");
      }
    }
  );
};

// Editar calidad
exports.editCalidad = (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM reporteCalidad WHERE idCalidad = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error al obtener la calidad: ", error);
        res.status(500).send("Error interno del servidor.");
      } else {
        res.render("editCalidad", { calidad: results[0] });
      }
    }
  );
};

// Actualizar calidad
exports.updateTarea = (req, res) => {
  const { id, hecho_por, comentario, nivelCalidad } = req.body;
  connection.query(
    "UPDATE reporteCalidad SET hecho_por = ?, comentario = ?, nivelCalidad = ? WHERE idCalidad = ?",
    [hecho_por, comentario, nivelCalidad, id],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar calidad:", error);
        res.status(500).send("Error interno del servidor: " + error);
      } else {
        console.log("Calidad actualizada correctamente.");
        res.redirect("/dashboard");
      }
    }
  );
};

// Eliminar calidad
exports.deleteCalidad = (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM reporteCalidad WHERE idCalidad = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error al eliminar calidad: ", error);
        res.status(500).send("Error interno del servidor");
      } else {
        res.redirect("/dashboard");
      }
    }
  );
};
