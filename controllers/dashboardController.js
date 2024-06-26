const connection = require("../database/db");

// Llamado de TAREAS y CALIDAD.
exports.getDashboard = (req, res) => {
  const tareasQuery = "SELECT * FROM tareaAsignar";
  const calidadQuery = "SELECT * FROM reporteCalidad";

  connection.query(tareasQuery, (error, tareasResults) => {
    if (error) {
      console.error("Error al obtener los datos de las tareas: ", error);
      res.status(500).send("Error al obtener los datos del dashboard");
      return;
    }

    connection.query(calidadQuery, (error, calidadResults) => {
      if (error) {
        console.error("Error al obtener los datos de calidad: ", error);
        res.status(500).send("Error al obtener los datos del dashboard");
        return;
      }

      res.render("dashboard", {
        tareas: tareasResults,
        calidad: calidadResults,
      });
    });
  });
};
