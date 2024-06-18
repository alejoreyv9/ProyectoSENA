// controllers/dashboardController.js
exports.getDashboard = (req, res) => {
  const query = "SELECT * FROM tarea"; // Asegúrate de que 'tarea' es el nombre correcto de tu tabla
  tuConexionDeBaseDeDatos.query(query, (error, results) => {
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
