const express = require("express");
const router = express.Router();
const bodegaProductoApiController = require("../controllers/bodegaProductoAPIController");

router.get("/", bodegaProductoApiController.getAllBodegaProductos);
router.post("/", bodegaProductoApiController.insertBodegaProducto);
router.get("/:id", bodegaProductoApiController.getBodegaProductoById);
router.put("/:id", bodegaProductoApiController.updateBodegaProducto);
router.delete("/:id", bodegaProductoApiController.deleteBodegaProducto);

module.exports = router;
