const connection = require("../database/db");

exports.getAllBodegas = (req, res) => {
  connection.query("SELECT * FROM bodega", (error, results) => {
    if (error) {
      console.error("Error al obtener bodegas: ", error);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      res.json(results);
    }
  });
};

exports.insertBodega = (req, res) => {
  const { codigo, accion, tipo, nombre, fecha, cantidad, pedidos } = req.body;
  connection.query(
    "INSERT INTO bodega (codigo, accion, tipo, nombre, fecha, cantidad, pedidos) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [codigo, accion, tipo, nombre, fecha, cantidad, pedidos],
    (error, results) => {
      if (error) {
        console.error("Error al insertar bodega:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.status(201).json({
          message: "Bodega creada correctamente",
          id: results.insertId,
        });
      }
    }
  );
};

exports.getBodega = (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM bodega WHERE idBodega = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error al obtener bodega:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        if (results.length > 0) {
          res.json(results[0]);
        } else {
          res.status(404).json({ message: "Bodega no encontrada" });
        }
      }
    }
  );
};

exports.updateBodega = (req, res) => {
  const { nombre, codigo, accion, tipo, fecha, cantidad, pedidos } = req.body;
  const id = req.params.id;
  connection.query(
    "UPDATE bodega SET nombre = ?, codigo = ?, accion = ?, tipo = ?, fecha = ?, cantidad = ?, pedidos = ? WHERE idBodega = ?",
    [nombre, codigo, accion, tipo, fecha, cantidad, pedidos, id],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar bodega:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.json({ message: "Bodega actualizada correctamente" });
      }
    }
  );
};

exports.deleteBodega = (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM bodega WHERE idBodega = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error al eliminar bodega: ", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.json({ message: "Bodega eliminada correctamente" });
      }
    }
  );
};
