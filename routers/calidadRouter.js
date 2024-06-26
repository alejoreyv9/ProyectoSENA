const express = require("express");
const router = express.Router();
const calidadController = require("../controllers/calidadController");

router.get("/", calidadController.getAllCalidad);
router.post("/insertarCalidad", calidadController.insertCalidad);
router.get("/edit/:id", calidadController.editCalidad);
router.post("/edit/:id", calidadController.updateTarea);
router.get("/delete/:id", calidadController.deleteCalidad);

module.exports = router;
