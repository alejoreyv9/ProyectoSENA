const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");

// Rutas para Productos
router.get("/", productoController.getAllProductos);
router.post("/crear", productoController.insertProducto);
router.get("/editar/:id", productoController.editProducto);
router.post("/actualizar/:id", productoController.updateProducto);
router.get("/eliminar/:id", productoController.deleteProducto);

module.exports = router;
