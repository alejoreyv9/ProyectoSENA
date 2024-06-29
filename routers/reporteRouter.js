const express = require("express");
const router = express.Router();
const reporteController = require("../controllers/reportesController");

// Ruta para obtener todos los reportes
router.get("/", reporteController.getAllReporte);

// Ruta para insertar un reporte
router.post("/insert", reporteController.insertReporte);

// Ruta para editar un reporte
router.get("/edit/:id", reporteController.editReporte);

// Ruta para actualizar un reporte
router.post("/update/:id", reporteController.updateReporte);

// Ruta para eliminar un reporte
router.get("/delete/:id", reporteController.deleteReporte);

module.exports = router;
