const express = require("express");
const router = express.Router();
const bodegaController = require("../controllers/bodegaController");

// Rutas para Bodegas
router.get("/", bodegaController.getAllBodegas);
router.post("/crear", bodegaController.insertBodega);
router.get("/editar/:id", bodegaController.editBodega);
router.post("/actualizar/:id", bodegaController.updateBodega);
router.get("/eliminar/:id", bodegaController.deleteBodega);

module.exports = router;
