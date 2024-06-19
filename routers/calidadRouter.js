const express = require("express");
const router = express.Router();
const calidadContoller = require("../controllers/calidadController");

router.get("/", calidadContoller.getAllTareas);
router.post("/insertarCalidad", calidadContoller.insertCalidad);
router.get("/edit/:id", calidadContoller.editCalidad);
router.post("/edit/:id", calidadContoller.updateTarea);
router.get("/delete/:id", calidadContoller.deleteCalidad);

module.exports = router;
