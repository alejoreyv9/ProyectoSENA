const connection = require("../database/db");

// Obtener todos los productos
exports.getAllProductos = (req, res) => {
  connection.query("SELECT * FROM producto", (error, results) => {
    if (error) {
      console.error("Error al obtener productos: ", error);
      return res.status(500).json({ error: "Error interno del servidor." });
    }
    res.json(results);
  });
};

// Obtener un producto por ID
exports.getProductoById = (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM producto WHERE idProducto = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error al obtener el producto: ", error);
        return res.status(500).json({ error: "Error interno del servidor." });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Producto no encontrado." });
      }
      res.json(results[0]);
    }
  );
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
        return res.status(500).json({ error: "Error interno del servidor." });
      }
      res
        .status(201)
        .json({
          message: "Producto creado exitosamente",
          id: results.insertId,
        });
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
        return res.status(500).json({ error: "Error interno del servidor." });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Producto no encontrado." });
      }
      res.json({ message: "Producto actualizado exitosamente" });
    }
  );
};

// Eliminar producto
exports.deleteProducto = (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM bodega_producto WHERE idProducto = ?",
    [id],
    (error) => {
      if (error) {
        console.error(
          "Error al eliminar relaciones de producto en bodega_producto: ",
          error
        );
        return res.status(500).json({ error: "Error interno del servidor." });
      }
      connection.query(
        "DELETE FROM producto WHERE idProducto = ?",
        [id],
        (error, results) => {
          if (error) {
            console.error("Error al eliminar producto: ", error);
            return res
              .status(500)
              .json({ error: "Error interno del servidor." });
          }
          if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Producto no encontrado." });
          }
          res.json({ message: "Producto eliminado exitosamente" });
        }
      );
    }
  );
};
