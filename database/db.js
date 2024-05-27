const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Adm1n24*/",
  database: "proyecFabricacion",
});

connection.connect((error) => {
  if (error) {
    console.error("El error de conexión a la base de datos es:", error);
    return;
  }
  console.log("¡Conexión a la base de datos MySQL exitosa!");
});

module.exports = connection;
