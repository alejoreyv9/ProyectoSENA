const connection = require("../database/db");

// Obtener todas las bodegas
exports.getAllBodegas = (req, res) => {
  connection.query("SELECT * FROM bodega", (error, results) => {
    if (error) {
      console.error("Error al obtener bodegas: ", error);
      res.status(500).send("Error interno del servidor.");
    } else {
      res.render("bodegas", { bodegas: results });
    }
  });
};

// Insertar bodega
exports.insertBodega = (req, res) => {
  const { codigo, accion, tipo, nombre, fecha, cantidad, pedidos } = req.body;
  connection.query(
    "INSERT INTO bodega (codigo, accion, tipo, nombre, fecha, cantidad, pedidos) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [codigo, accion, tipo, nombre, fecha, cantidad, pedidos],
    (error, results) => {
      if (error) {
        console.error("Error al insertar bodega:", error);
        res.status(500).send("Error interno del servidor.");
      } else {
        res.redirect("/bodega");
      }
    }
  );
};

// Obtener bodega para editar
exports.editBodega = (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM bodega WHERE idBodega = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error al obtener bodega:", error);
        res.status(500).send("Error interno del servidor.");
      } else {
        res.render("editBodega", { bodega: results[0] });
      }
    }
  );
};

// Actualizar bodega
exports.updateBodega = (req, res) => {
  const { nombre, codigo, accion, tipo, fecha, cantidad, pedidos } = req.body;
  const id = req.params.id;
  connection.query(
    "UPDATE bodega SET nombre = ?, codigo = ?, accion = ?, tipo = ?, fecha = ?, cantidad = ?, pedidos = ? WHERE idBodega = ?",
    [nombre, codigo, accion, tipo, fecha, cantidad, pedidos, id],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar bodega:", error);
        res.status(500).send("Error interno del servidor.");
      } else {
        res.redirect("/dashboard");
      }
    }
  );
};

// Eliminar bodega
exports.deleteBodega = (req, res) => {
  const id = req.params.id;

  // Eliminar relaciones en bodega_producto primero
  connection.query(
    "DELETE FROM bodega_producto WHERE idBodega = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error(
          "Error al eliminar relaciones de bodega en bodega_producto: ",
          error
        );
        res.status(500).send("Error interno del servidor.");
      } else {
        // Luego eliminar la bodega
        connection.query(
          "DELETE FROM bodega WHERE idBodega = ?",
          [id],
          (error, results) => {
            if (error) {
              console.error("Error al eliminar bodega: ", error);
              res.status(500).send("Error interno del servidor.");
            } else {
              res.redirect("/dashboard");
            }
          }
        );
      }
    }
  );
};
