const connection = require("../database/db");

// Obtener todos los productos
exports.getAllProductos = (req, res) => {
  connection.query("SELECT * FROM producto", (error, results) => {
    if (error) {
      console.error("Error al obtener productos: ", error);
      res.status(500).send("Error interno del servidor.");
    } else {
      res.render("producto", { productos: results });
    }
  });
};

// Insertar producto
exports.insertProducto = (req, res) => {
  const {
    nombreProducto,
    cantidadPorProducto,
    precioUnidad,
    unidadExistencia,
    unidadPedido,
  } = req.body;
  connection.query(
    "INSERT INTO producto (nombreProducto, cantidadPorProducto, precioUnidad, unidadExistencia, unidadPedido) VALUES (?, ?, ?, ?, ?)",
    [
      nombreProducto,
      cantidadPorProducto,
      precioUnidad,
      unidadExistencia,
      unidadPedido,
    ],
    (error, results) => {
      if (error) {
        console.error("Error al insertar producto:", error);
        res.status(500).send("Error interno del servidor.");
      } else {
        res.redirect("/bodega");
      }
    }
  );
};

// Editar producto
exports.editProducto = (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM producto WHERE idProducto = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error al obtener el producto: ", error);
        res.status(500).send("Error interno del servidor.");
      } else {
        res.render("editProducto", { producto: results[0] });
      }
    }
  );
};

// Actualizar producto
exports.updateProducto = (req, res) => {
  const id = req.params.id;
  const {
    nombreProducto,
    cantidadPorProducto,
    precioUnidad,
    unidadExistencia,
    unidadPedido,
  } = req.body;
  connection.query(
    "UPDATE producto SET nombreProducto = ?, cantidadPorProducto = ?, precioUnidad = ?, unidadExistencia = ?, unidadPedido = ? WHERE idProducto = ?",
    [
      nombreProducto,
      cantidadPorProducto,
      precioUnidad,
      unidadExistencia,
      unidadPedido,
      id,
    ],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).send("Error interno del servidor.");
      } else {
        res.redirect("/dashboard");
      }
    }
  );
};

// Eliminar producto
exports.deleteProducto = (req, res) => {
  const id = req.params.id;

  // Eliminar relaciones en bodega_producto primero
  connection.query(
    "DELETE FROM bodega_producto WHERE idProducto = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error(
          "Error al eliminar relaciones de producto en bodega_producto: ",
          error
        );
        res.status(500).send("Error interno del servidor.");
      } else {
        // Luego eliminar el producto
        connection.query(
          "DELETE FROM producto WHERE idProducto = ?",
          [id],
          (error, results) => {
            if (error) {
              console.error("Error al eliminar producto: ", error);
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
