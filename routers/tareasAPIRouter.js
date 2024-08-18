const express = require("express");
const router = express.Router();
const tareasApiController = require("../controllers/tareasAPIController");

router.get("/", tareasApiController.getAllTareas);
router.post("/", tareasApiController.insertTarea);
router.get("/:id", tareasApiController.getTarea);
router.put("/:id", tareasApiController.updateTarea);
router.delete("/:id", tareasApiController.deleteTarea);

module.exports = router;
