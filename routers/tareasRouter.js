// routes/tareasRouter.js
const express = require("express");
const router = express.Router();
const tareasController = require("../controllers/tareasController");

router.get("/", tareasController.getAllTareas);
router.post("/insertarTarea", tareasController.insertTarea);
router.get("/edit/:id", tareasController.editTarea);
router.post("/edit/:id", tareasController.updateTarea);
router.get("/delete/:id", tareasController.deleteTarea);

module.exports = router;
