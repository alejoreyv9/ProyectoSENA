const express = require("express");
const router = express.Router();
const reportesApiController = require("../controllers/reportesAPIController");

router.get("/", reportesApiController.getAllReportes);
router.post("/", reportesApiController.insertReporte);
router.get("/:id", reportesApiController.getReporte);
router.put("/:id", reportesApiController.updateReporte);
router.delete("/:id", reportesApiController.deleteReporte);

module.exports = router;
