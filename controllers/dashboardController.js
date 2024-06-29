const connection = require("../database/db");

// Llamado de TODAS LAS VISTA
exports.getDashboard = (req, res) => {
  const tareasQuery = "SELECT * FROM tareaAsignar";
  const calidadQuery = "SELECT * FROM reporteCalidad";
  const reportesQuery = "SELECT * FROM reporteFabricacion";

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
      connection.query(reportesQuery, (error, reportesResult) => {
        if (error) {
          console.error("Error al obtener los datos de reportes: ", error);
          res.status(500).send("Error al obtener los datos del Dashboard");
          return;
        }

        res.render("dashboard", {
          tareas: tareasResults,
          calidad: calidadResults,
          reportes: reportesResult,
        });
      });
    });
  });
};
