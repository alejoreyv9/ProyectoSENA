const connection = require("../database/db");

exports.getAllCalidad = (req, res) => {
  connection.query("SELECT * FROM reporteCalidad", (error, results) => {
    if (error) {
      console.error("Error al obtener tareas: ", error);
      res.status(500).send("Error interno del Servidor.");
    } else {
      res.render("calidad", { results });
    }
  });
};

exports.insertCalidad = (req, res) => {
  const { hecho_por, comentario, problema, medio, excelente } = req.body;
  connection.query(
    "UPDATE reporteCalidad SET  hecho_por = ?  comentario = ?   nivelCalidad = ? WHERE idCalidad = ?",
    [hecho_por, comentario, problema, medio, excelente, id],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar tarea:", error);
        res.status(500).send("Error interno del Servidor: " + error);
        return;
      } else {
        res.redirect("/dashboard");
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
        console.error("Error al eliminar calidad: ", error);
        res.status(500).send("Error interno del servidor");
      } else {
        res.redirect("/calidad");
      }
    }
  );
};

// CREATE TABLE reporteCalidad (
// 	idCalidad INT AUTO_INCREMENT PRIMARY KEY,
//     hecho_por VARCHAR(255),
//     comentario TEXT,
//     problema VARCHAR(255),
//     medio VARCHAR(255),
//     excelente VARCHAR(255)
// );
