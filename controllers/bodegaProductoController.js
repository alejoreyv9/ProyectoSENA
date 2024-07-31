const connection = require("../database/db");

// Obtener todos los registros de bodega_producto
exports.getAllBodegaProductos = (req, res) => {
  connection.query(
    "SELECT * FROM bodega_producto",
    (error, bodega_producto) => {
      if (error) {
        console.error("Error al obtener bodega_producto: ", error);
        res.status(500).send("Error interno del servidor.");
      } else {
        connection.query("SELECT * FROM bodega", (error, bodegas) => {
          if (error) {
            console.error("Error al obtener bodegas: ", error);
            res.status(500).send("Error interno del servidor.");
          } else {
            connection.query("SELECT * FROM producto", (error, productos) => {
              if (error) {
                console.error("Error al obtener productos: ", error);
                res.status(500).send("Error interno del servidor.");
              } else {
                res.render("bodega", { bodega_producto, bodegas, productos });
              }
            });
          }
        });
      }
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
        res.status(500).send("Error interno del servidor.");
      } else {
        res.redirect("/bodega");
      }
    }
  );
};

// Editar bodega_producto
exports.editBodegaProducto = (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM bodega_producto WHERE idProductoBodega = ?",
    [id],
    (error, bodegaProducto) => {
      if (error) {
        console.error("Error al obtener bodega_producto: ", error);
        res.status(500).send("Error interno del servidor.");
      } else {
        connection.query("SELECT * FROM bodega", (error, bodegas) => {
          if (error) {
            console.error("Error al obtener bodegas: ", error);
            res.status(500).send("Error interno del servidor.");
          } else {
            connection.query("SELECT * FROM producto", (error, productos) => {
              if (error) {
                console.error("Error al obtener productos: ", error);
                res.status(500).send("Error interno del servidor.");
              } else {
                res.render("editBodegaProducto", {
                  bodegaProducto: bodegaProducto[0],
                  bodegas,
                  productos,
                });
              }
            });
          }
        });
      }
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
        res.status(500).send("Error interno del servidor.");
      } else {
        res.redirect("/dashboard");
      }
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
        res.status(500).send("Error interno del servidor.");
      } else {
        res.redirect("/dashboard");
      }
    }
  );
};
