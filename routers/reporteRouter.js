const express = require("express");
const router = express.Router();
const reporteController = require("../controllers/reportesController");

router.get("/", reporteController.getAllReporte);
router.post("/insertReporte", reporteController.insertReporte);
router.get("/edit/:id", reporteController.editReporte);
router.post("/edit/:id", reporteController.updateReporte);
router.get("/delete/:id", reporteController.deleteReporte);

module.exports = router;
