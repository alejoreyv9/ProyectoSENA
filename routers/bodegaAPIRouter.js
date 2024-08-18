const express = require("express");
const router = express.Router();
const bodegaApiController = require("../controllers/bodegaAPIController");

router.get("/", bodegaApiController.getAllBodegas);
router.post("/", bodegaApiController.insertBodega);
router.get("/:id", bodegaApiController.getBodega);
router.put("/:id", bodegaApiController.updateBodega);
router.delete("/:id", bodegaApiController.deleteBodega);

module.exports = router;
