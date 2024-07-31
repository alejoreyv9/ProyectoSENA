const express = require("express");
const router = express.Router();
const bodegaProductoController = require("../controllers/bodegaProductoController");

// Rutas para Bodega_Producto
router.get("/", bodegaProductoController.getAllBodegaProductos);
router.post("/create", bodegaProductoController.insertBodegaProducto);
router.get("/editar/:id", bodegaProductoController.editBodegaProducto);
router.post("/actualizar/:id", bodegaProductoController.updateBodegaProducto);
router.get("/eliminar/:id", bodegaProductoController.deleteBodegaProducto);

module.exports = router;
