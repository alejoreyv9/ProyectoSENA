const connection = require("../database/db");

// Obtener todos los registros de bodega_producto
exports.getAllBodegaProductos = (req, res) => {
  connection.query("SELECT * FROM bodega_producto", (error, results) => {
    if (error) {
      console.error("Error al obtener bodega_producto: ", error);
      return res.status(500).json({ error: "Error interno del servidor." });
    }
    res.json(results);
  });
};

// Obtener un registro de bodega_producto por ID
exports.getBodegaProductoById = (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM bodega_producto WHERE idProductoBodega = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error al obtener bodega_producto: ", error);
        return res.status(500).json({ error: "Error interno del servidor." });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Registro no encontrado." });
      }
      res.json(results[0]);
    }
  );
};

// Insertar bodega_producto
exports.insertBodegaProducto = (req, res) => {
  const { idBodega, idProducto, cantidad } = req.body;
  connection.query(
    "INSERT INTO bodega_producto (idBodega, idProducto, cantidad) VALUES (?, ?, ?)",
    [idBodega, idProducto, cantidad],
    (error, results) => {
      if (error) {
        console.error("Error al insertar bodega_producto:", error);
        return res.status(500).json({ error: "Error interno del servidor." });
      }
      res
        .status(201)
        .json({
          message: "Registro creado exitosamente",
          id: results.insertId,
        });
    }
  );
};

// Actualizar bodega_producto
exports.updateBodegaProducto = (req, res) => {
  const id = req.params.id;
  const { idBodega, idProducto, cantidad } = req.body;
  connection.query(
    "UPDATE bodega_producto SET idBodega = ?, idProducto = ?, cantidad = ? WHERE idProductoBodega = ?",
    [idBodega, idProducto, cantidad, id],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar bodega_producto:", error);
        return res.status(500).json({ error: "Error interno del servidor." });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Registro no encontrado." });
      }
      res.json({ message: "Registro actualizado exitosamente" });
    }
  );
};

// Eliminar bodega_producto
exports.deleteBodegaProducto = (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM bodega_producto WHERE idProductoBodega = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error al eliminar bodega_producto: ", error);
        return res.status(500).json({ error: "Error interno del servidor." });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Registro no encontrado." });
      }
      res.json({ message: "Registro eliminado exitosamente" });
    }
  );
};
