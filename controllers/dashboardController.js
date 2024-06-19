const connection = require("../database/db");

// LLamado de TAREAS.
exports.getDashboard = (req, res) => {
  const query = "SELECT * FROM tareaAsignar"; // Asegúrate de que 'tarea' es el nombre correcto de tu tabla
  connection.query(query, (error, results) => {
    if (error) {
      // Manejar el error aquí
      console.error("Error al obtener los datos de la tarea: ", error);
      res.status(500).send("Error al obtener los datos del dashboard");
    } else {
      // Si no hay error, renderizar la vista con los resultados
      res.render("dashboard", { results });
    }
  });
};

// LLamado de CALIDAD.
exports.getDashboard = (req, res) => {
  const query = "SELECT * FROM reporteCalidad";
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error al obtener los datos de la calidad: ", error);
      res.status(500).send("Error al obtener los datos del dashboard");
    } else {
      res.render("dashboard", { results });
    }
  });
};
