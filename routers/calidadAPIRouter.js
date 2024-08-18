const express = require("express");
const router = express.Router();
const calidadApiController = require("../controllers/calidadAPIController");

router.get("/", calidadApiController.getAllCalidad);
router.post("/", calidadApiController.insertCalidad);
router.get("/:id", calidadApiController.getCalidad);
router.put("/:id", calidadApiController.updateCalidad);
router.delete("/:id", calidadApiController.deleteCalidad);

module.exports = router;
